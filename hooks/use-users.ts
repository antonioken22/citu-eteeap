import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "@/firebase/config";

export const useUsers = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch the user's document from Firestore using Clerk's user ID
        const userDoc = await getDoc(doc(firestore, "users", user.id));
        if (userDoc.exists()) {
          const role = userDoc.data()?.role;
          setUserRole(role || null); // Set the role or null if it doesn't exist
        } else {
          console.warn(`User document not found for ID: ${user.id}`);
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error fetching user role from Firestore:", error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { userRole, loading };
};
