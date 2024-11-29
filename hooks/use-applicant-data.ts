import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { ApplicantData } from "@/types/ApplicantData";

const useApplicantData = () => {
  const { user, isLoaded } = useUser(); // Clerk's useUser hook
  const [applicantData, setApplicantData] = useState<ApplicantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect triggered");
    const fetchApplicantData = async () => {
      if (isLoaded && user) {
        try {
          setLoading(true);
          setError(null);

          console.log("Fetching applicant data for user ID:", user.id);

          // Query the applications collection for a document where applicantID matches user.id
          const applicationsRef = collection(firestore, "applications");
          const q = query(applicationsRef, where("applicantId", "==", user.id));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]; // Assuming one document per user
            const data = doc.data() as ApplicantData;
            setApplicantData(data);
          } else {
            console.warn("No applicant data found for user with ID:", user.id);
          }
        } catch (err) {
          setError("Failed to fetch applicant data.");
          console.error("Error fetching applicant data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplicantData();
  }, [user, isLoaded]);

  return { applicantData, loading, error };
};

export default useApplicantData;
