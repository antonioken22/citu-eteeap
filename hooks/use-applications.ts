import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  collection,
  setDoc, // Use setDoc instead of addDoc to specify custom ID
  deleteDoc,
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

const useApplications = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<ApplicantData[]>([]);

  // Real-time read query for fetching applications
  useEffect(() => {
    const applicationsCollection = collection(firestore, "applications");

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      applicationsCollection,
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
  }, []);

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
    setError(null);

    try {
      const applicationId = await generateApplicationId(); // Generate custom ID
      const applicationData = { ...data, applicationId }; // Add the custom ID to data

      // Use setDoc with custom ID (applicationId) instead of addDoc
      await setDoc(doc(firestore, "applications", applicationId), applicationData);
      toast.info("Application created with ID: " + applicationId);
    } catch (e) {
      toast.error("Error adding document: " + e);
    } finally {
      setLoading(false);
    }
  };

  // Delete application by applicationId
  const deleteApplication = async (applicationId: string) => {
    setLoading(true);
    setError(null);

    try {
      const applicationsCollection = collection(firestore, "applications");
      const q = query(applicationsCollection, where("applicationId", "==", applicationId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id; // Get the document ID
        await deleteDoc(doc(firestore, "applications", docId));
        toast.info("Application deleted with ID: " + applicationId);
      } else {
        toast.error("Application not found with ID: " + applicationId);
      }
    } catch (e) {
      toast.error("Error deleting document: " + e);
    } finally {
      setLoading(false);
    }
  };

  return { createApplication, deleteApplication, applications, loading, error };
};

export default useApplications;