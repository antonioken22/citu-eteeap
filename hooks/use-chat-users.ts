import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { UserData } from "@/types/UserData";
import { useUsers } from "@/hooks/use-users";

export const useChatUsers = () => {
  const { userRole, loading: userLoading } = useUsers(); // Destructure `userRole` and `loading`
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch users based on the role
  const fetchUsers = useCallback(async () => {
    if (!userRole) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const usersCollection = collection(firestore, "users");

      // Admins fetch all users; Non-admins fetch only admins
      const usersQuery =
        userRole === "admin"
          ? usersCollection
          : query(usersCollection, where("role", "==", "admin"));

      const usersSnapshot = await getDocs(usersQuery);
      const usersList: UserData[] = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[];
      setUsers(usersList);
      toast.success("Users fetched successfully.");
    } catch (error) {
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, [userRole]);

  // Realtime listener to update the UI on changes
  useEffect(() => {
    if (!userRole) {
      setLoading(false);
      return;
    }

    const usersCollection = collection(firestore, "users");
    const usersQuery =
      userRole === "admin"
        ? usersCollection
        : query(usersCollection, where("role", "==", "admin"));

    const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const usersList: UserData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[];
      setUsers(usersList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userRole]);

  return { users, loading: loading || userLoading };
};