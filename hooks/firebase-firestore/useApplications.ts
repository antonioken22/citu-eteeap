"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { firestore } from "@/firebase/config";
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
  Unsubscribe,
  getDoc,
} from "firebase/firestore";

import { toast } from "sonner";

import { ApplicantData } from "@/types/ApplicantData";

import { useUser } from "@clerk/nextjs";

// Helper function to generate the next applicationId
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

export const useApplications = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [userApplications, setUserApplications] = useState<ApplicantData[]>([]);
  const [allApplications, setAllApplications] = useState<ApplicantData[]>([]);
  const userUnsubscribeRef = useRef<Unsubscribe | null>(null);
  const adminUnsubscribeRef = useRef<Unsubscribe | null>(null);

  // Cleanup onSnapshot subscriptions on unmount
  useEffect(() => {
    return () => {
      if (userUnsubscribeRef.current) {
        userUnsubscribeRef.current();
        userUnsubscribeRef.current = null;
      }
      if (adminUnsubscribeRef.current) {
        adminUnsubscribeRef.current();
        adminUnsubscribeRef.current = null;
      }
    };
  }, []);

  // READ user's applications (USER)
  const fetchUserApplications = useCallback(() => {
    if (!user) {
      toast.error("You are not logged in.");
      return;
    }

    // Clean up existing subscription if any
    if (userUnsubscribeRef.current) {
      userUnsubscribeRef.current();
    }

    setLoading(true);

    const applicationsCollection = collection(firestore, "applications");
    const q = query(
      applicationsCollection,
      where("isDeleted", "==", false),
      where("applicantId", "==", user.id)
    );

    userUnsubscribeRef.current = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updatedApplications: ApplicantData[] = snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            } as ApplicantData)
        );

        setUserApplications(updatedApplications);
        setLoading(false);
      },
      (error) => {
        toast.error("Error user applications: " + error);
        console.error("Error user applications: " + error);
        setLoading(false);
      }
    );

    return () => {
      if (userUnsubscribeRef.current) {
        userUnsubscribeRef.current();
        userUnsubscribeRef.current = null;
      }
    };
  }, [user]);

  // READ all applications (ADMIN)
  const fetchAllApplications = useCallback(() => {
    if (!user || user?.publicMetadata.role !== "admin") {
      toast.error("Unauthorized access.");
      return;
    }

    // Clean up existing subscription if any
    if (adminUnsubscribeRef.current) {
      adminUnsubscribeRef.current();
    }

    setLoading(true);

    const applicationsCollection = collection(firestore, "applications");
    const q = query(
      applicationsCollection,
      where("isDeleted", "==", false)
      // TODO: Write isArchived value to all data
      // where("isArchived", "==", false)
    );

    adminUnsubscribeRef.current = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updatedApplications: ApplicantData[] = snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            } as ApplicantData)
        );

        setAllApplications(updatedApplications);
        setLoading(false);
      },
      (error) => {
        toast.error("Error fetching all applications: " + error);
        console.error("Error fetching all applications: " + error);
        setLoading(false);
      }
    );

    return () => {
      if (adminUnsubscribeRef.current) {
        adminUnsubscribeRef.current();
        adminUnsubscribeRef.current = null;
      }
    };
  }, [user]);

  // READ application by applicationId (ADMIN)
  const fetchApplicationByApplicationId = async (
    applicationId: string
  ): Promise<ApplicantData | null> => {
    if (!user || user?.publicMetadata.role !== "admin") {
      toast.error("Unauthorized access.");
      return null;
    }

    setLoading(true);

    const applicationDoc = doc(firestore, "applications", applicationId);

    try {
      const applicationSnapshot = await getDoc(applicationDoc);

      if (applicationSnapshot.exists()) {
        const applicationData = applicationSnapshot.data() as ApplicantData;
        return applicationData;
      } else {
        return null;
      }
    } catch (error) {
      toast.error("Error fetching application: " + error);
      console.error("Error fetching application: " + error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // READ specific user's old applications (ADMIN)
  const fetchOldApplicationsByApplicantId = async (
    applicantId: string
  ): Promise<ApplicantData[] | null> => {
    if (!user || user?.publicMetadata.role !== "admin") {
      toast.error("Unauthorized access.");
      return null;
    }

    setLoading(true);

    const oldApplicationsCollection = collection(firestore, "oldApplications");
    const q = query(
      oldApplicationsCollection,
      where("isDeleted", "==", false),
      where("applicantId", "==", applicantId)
    );

    try {
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return null;
      }

      const oldApplications: ApplicantData[] = snapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
          } as ApplicantData)
      );
      return oldApplications;
    } catch (error) {
      toast.error("Error fetching old applications: " + error);
      console.error("Error fetching old applications: " + error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // CREATE application (USER)
  const createApplication = async (data: ApplicantData) => {
    if (!user) {
      toast.error("You are not logged in.");
      return;
    }

    setLoading(true);

    try {
      const applicationId = await generateApplicationId(); // Generate custom ID
      // Ensure birthdate is set to midnight
      if (data.birthdate instanceof Date) {
        data.birthdate.setHours(0, 0, 0, 0);
      }

      const applicationData = {
        ...data,
        dateCreated: new Date(),
        dateSubmitted: new Date(),
        applicationId,
        isDeleted: false,
        isSubmitted: true,
        isEdited: false,
        canEdit: true,
      };

      // Use setDoc with custom ID (applicationId) instead of addDoc
      await setDoc(
        doc(firestore, "applications", applicationId),
        applicationData
      );
      toast.success("Application successfully submitted.");
    } catch (error) {
      toast.error("Error adding document: " + error);
      console.error("Error adding document: " + error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE application (USER)
  const updateApplication = async (
    applicationId: string,
    data: Partial<ApplicantData>
  ) => {
    if (!user) {
      toast.error("You are not logged in.");
      return;
    }

    setLoading(true);

    // Ensure birthdate is set to midnight
    if (data.birthdate instanceof Date) {
      data.birthdate.setHours(0, 0, 0, 0);
    }

    try {
      const applicationsCollection = collection(firestore, "applications");
      const q = query(
        applicationsCollection,
        where("applicationId", "==", applicationId)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const currentApp = snapshot.docs[0];
        const currentData = currentApp.data() as ApplicantData;

        // Generate the custom ID for oldApplications
        const now = new Date();
        const timestamp = now
          .toLocaleString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })
          .replace(/\//g, "-");
        const oldApplicationId = `${applicationId} ${timestamp}`;

        // Save the current version to "oldApplications" table with the custom ID
        const oldApplicationsCollection = collection(
          firestore,
          "oldApplications"
        );
        await setDoc(doc(oldApplicationsCollection, oldApplicationId), {
          ...currentData,
          dateArchived: now,
        });
        // toast.success("Old application successfully archived.");

        // Update the application with new data
        const applicationDoc = doc(firestore, "applications", currentApp.id);
        await updateDoc(applicationDoc, {
          ...data,
          dateSubmitted: now,
          dateModified: now,
          isEdited: true,
          canEdit: true,
        });

        toast.success("Application successfully updated.");
      } else {
        toast.error("Application not found with ID: " + applicationId);
      }
    } catch (error) {
      toast.error("Error updating application: " + error);
      console.error("Error updating application: " + error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE canEdit (ADMIN)
  const updateCanEdit = async (
    applicationId: string,
    canEdit: Pick<ApplicantData, "canEdit">
  ) => {
    if (!user || user?.publicMetadata.role !== "admin") {
      toast.error("Unauthorized access.");
      return;
    }

    setLoading(true);

    try {
      const applicationsCollection = collection(firestore, "applications");
      const q = query(
        applicationsCollection,
        where("applicationId", "==", applicationId)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const currentApp = snapshot.docs[0];
        const applicationDoc = doc(firestore, "applications", currentApp.id);
        await updateDoc(applicationDoc, canEdit);

        toast.success("Editing response privileges has been changed.");
      } else {
        toast.error("Application not found with ID: " + applicationId);
      }
    } catch (error) {
      toast.error("Error updating editing response privileges: " + error);
      console.error("Error updating editing response privileges: " + error);
    } finally {
      setLoading(false);
    }
  };

  // SOFT DELETE application (ADMIN)
  const deleteApplication = async (applicationId: string) => {
    if (!user || user?.publicMetadata.role !== "admin") {
      toast.error("Unauthorized access.");
      return;
    }

    setLoading(true);

    try {
      const applicationsCollection = collection(firestore, "applications");
      const q = query(
        applicationsCollection,
        where("applicationId", "==", applicationId)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id; // Get the document ID
        await updateDoc(doc(firestore, "applications", docId), {
          isDeleted: true,
          dateDeleted: new Date(),
        }); // Soft delete by setting isDeleted to true
        toast.success("Application successfully deleted. " + applicationId);
      } else {
        toast.error("Application not found with ID: " + applicationId);
      }
    } catch (error) {
      toast.error("Error deleting document: " + error);
      console.error("Error deleting document: " + error);
    } finally {
      setLoading(false);
    }
  };

  return {
    userApplications,
    fetchUserApplications,
    allApplications,
    fetchAllApplications,
    fetchApplicationByApplicationId,
    fetchOldApplicationsByApplicantId,
    createApplication,
    updateApplication,
    updateCanEdit,
    deleteApplication,
    loading,
  };
};
