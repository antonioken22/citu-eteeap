import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  collection,
  setDoc, 
  updateDoc,
  getDocs,
  query,
  where,
  doc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

import { firestore } from "@/firebase/config";

import { ApplicantData } from "@/types/ApplicantData";

import { useUser } from "@clerk/nextjs";

export const useApplications = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [applications, setApplications] = useState<ApplicantData[]>([]);
  const [allApplications, setAllApplications] = useState<ApplicantData[]>([]);

  // Read All Applications (Admin)
  useEffect(() => {
    if (!user){
      return;
    }

    if (user.publicMetadata.role !== "admin"){
      toast.error("You are not authorized.");
      return;
    }

    const applicationsCollection = collection(firestore, "applications");

    // Modify the query to only fetch applications where isDeleted is false
    const q = query(applicationsCollection, where("isDeleted", "==", false));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updatedApplications: ApplicantData[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Attach the document ID
        } as unknown as ApplicantData));

        setAllApplications(updatedApplications);
      },
      (e) => {
        toast.error("Error fetching applications.");
        console.error("Error fetching applications: " + e);
      }
    );

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [user]);

  // Read User's Applications
  useEffect(() => {
    if (!user){
      return;
    }

    const applicationsCollection = collection(firestore, "applications");

    // Modify the query to only fetch applications where isDeleted is false
    const q = query(applicationsCollection, where("isDeleted", "==", false), where("applicantId", "==", user.id));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updatedApplications: ApplicantData[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Attach the document ID
        } as unknown as ApplicantData));

        setApplications(updatedApplications);
      },
      (error) => {
        toast.error("Error fetching applications: " + error.message);
      }
    );

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [user]);

  // Function to generate the next applicationId
  const generateApplicationId = async (): Promise<string> => {
    try {
      const applicationsCollection = collection(firestore, "applications");
      const snapshot = await getDocs(applicationsCollection);
      const count = snapshot.size; // Get the current count of applications

      // Generate the next application ID formatted as A00001, A00002, etc.
      const nextId = `A${(count + 1).toString().padStart(5, "0")}`;
      return nextId;
    } catch (e) {
      throw new Error("Error generating application ID");
    }
  };

  // Create application with custom applicationId as document ID
  const createApplication = async (data: ApplicantData) => {
    setLoading(true);

    try {
      const applicationId = await generateApplicationId(); // Generate custom ID
      const applicationData = { ...data, dateCreated: new Date(), dateSubmitted: new Date(), applicationId, isDeleted: false, isSubmitted: true, isEdited: false }; 

      // Use setDoc with custom ID (applicationId) instead of addDoc
      await setDoc(doc(firestore, "applications", applicationId), applicationData);
      toast.success("Application successfully submitted.");
    } catch (e) {
      toast.error("Error adding document. Please contact the developer.");
      console.error("Error adding document: " + e);
    } finally {
      setLoading(false);
    }
  };

  // Update application 
  const updateApplication = async (applicationId: string, data: Partial<ApplicantData>) => {
    setLoading(true);
    
    try {
      const applicationDoc = doc(firestore, "applications", applicationId) ;

      await updateDoc(applicationDoc, data),{
        ...data,
        dateModified: new Date(),
      };
      toast.success("Application successfully updated.");
    } catch (e) {
      toast.error("Error updating document. Please contact the developer.");
      console.error("Error updating document: " + e);
    } finally {
      setLoading(false);
    }
    
  }

  // Soft delete application by updating isDeleted to true
  const deleteApplication = async (applicationId: string) => {
    setLoading(true);

    try {
      const applicationsCollection = collection(firestore, "applications");
      const q = query(applicationsCollection, where("applicationId", "==", applicationId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id; // Get the document ID
        await updateDoc(doc(firestore, "applications", docId), { isDeleted: true, dateDeleted: new Date() }); // Soft delete by setting isDeleted to true
        toast.success("Application successfully deleted. " + applicationId);
      } else {
        toast.error("Application not found with ID: " + applicationId);
      }
    } catch (e) {
      toast.error("Error deleting document. Please contact the developer.");
      console.error("Error deleting document: " + e);
    } finally {
      setLoading(false);
    }
  };

  return { createApplication, updateApplication, deleteApplication, applications,allApplications, loading };
};