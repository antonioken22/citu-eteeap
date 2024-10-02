import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

import { firestore } from "@/firebase/config";

export const useUsers = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  // Fetch user role from Firebase
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user && user.id) {
        try {
          setLoading(true);
          const userDoc = await getDoc(doc(firestore, "users", user.id));
          if (userDoc.exists()) {
            // Set the user's role from Firestore
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { userRole, loading };
};
