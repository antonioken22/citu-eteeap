"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { firestore } from "@/firebase/config";
import {
  collection,
  query,
  where,
  Unsubscribe,
  onSnapshot,
} from "firebase/firestore";

import { toast } from "sonner";

import { ApplicantData } from "@/types/ApplicantData";

import { useUser } from "@clerk/clerk-react";

export const useApplicantData = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [applicantData, setApplicantData] = useState<ApplicantData | null>(
    null
  );
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

  // READ applicant data (USER)
  const fetchApplicantData = useCallback(async () => {
    if (!user) {
      toast.error("You are not logged in.");
      return;
    }

    // Clean up existing subscription if any
    if (userUnsubscribeRef.current) {
      userUnsubscribeRef.current();
    }

    setLoading(true);

    const applicationsRef = collection(firestore, "applications");
    const q = query(
      applicationsRef,
      where("isDeleted", "==", false),
      where("applicantId", "==", user.id)
    );

    userUnsubscribeRef.current = onSnapshot(
      q,
      (snapshot) => {
        const updatedApplicantData = snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as unknown as ApplicantData)
        )[0];

        setApplicantData(updatedApplicantData);
        setLoading(false);
      },
      (error) => {
        toast.error("Error fetching applicant data: " + error);
        console.error("Error fetching applicant data: " + error);
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

  return { applicantData, fetchApplicantData, loading };
};
