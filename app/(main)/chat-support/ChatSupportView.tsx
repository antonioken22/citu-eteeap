"use client";

import { useEffect, useState } from "react";

import { UserData } from "@/types/UserData";

import { useUser } from "@clerk/nextjs";
import { useUsers } from "@/hooks/firebase-firestore/use-users";

import { ChatUsers } from "./_components/ChatUsers";
import { ChatMessageHistory } from "./_components/ChatMessageHistory";
import { ChatComposeMessage } from "./_components/ChatComposeMessage";
import { useActiveUsers } from "@/hooks/firebase-firestore/use-active-users";

export const ChatSupportView = () => {
  const { user, isLoaded } = useUser();
  const { logActiveUser } = useActiveUsers();
  const {
    allUsers,
    fetchAllUsers,
    adminUsers,
    fetchAdminUsers,
    loading: useUsersLoading,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState<Partial<UserData> | null>(
    null
  );

  // Fetch when component mounts
  useEffect(() => {
    if (isLoaded && user) {
      logActiveUser(
        user.id,
        user.primaryEmailAddress?.emailAddress as string,
        user.firstName ?? "",
        user.lastName ?? ""
      );
    }
    if (isLoaded && user?.publicMetadata.role === "admin") {
      fetchAllUsers();
    }
    if (isLoaded && user?.publicMetadata.role !== "admin") {
      fetchAdminUsers();
    }
  }, [isLoaded, user, logActiveUser, fetchAllUsers, fetchAdminUsers]);

  return (
    <div className="px-4 lg:px-8 pt-4">
      <div className="flex flex-col">
        <ChatUsers
          chatUsers={
            user?.publicMetadata.role === "admin" ? allUsers : adminUsers
          }
          onChartUsersLoading={useUsersLoading}
          onSelectUser={setSelectedUser}
        />
        <hr />
        <div className="h-[59vh] md:h-[60vh] overflow-y-auto">
          <ChatMessageHistory selectedUser={selectedUser} />
        </div>
        <div className="bottom-0">
          <hr />
          <ChatComposeMessage selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
};
