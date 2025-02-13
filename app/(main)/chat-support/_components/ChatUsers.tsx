"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UserData } from "@/types/UserData";

import { useUser } from "@clerk/nextjs";
import { useActiveUsers } from "@/hooks/firebase-firestore/use-active-users";
import { useChatMessages } from "@/hooks/firebase-firestore/use-chat-messages";

type ChatUsersProps = {
  chatUsers: UserData[];
  onChartUsersLoading?: boolean;
  onSelectUser: (user: Partial<UserData>) => void;
};

export const ChatUsers = ({
  chatUsers,
  onChartUsersLoading = false,
  onSelectUser,
}: ChatUsersProps) => {
  const { user: currentUser, isLoaded } = useUser();
  const {
    chatMessages,
    fetchChatMessages,
    markChatMessagesAsRead,
    loading: useChatMessagesLoading,
  } = useChatMessages();
  const {
    activeUsers,
    fetchActiveUsers,
    loading: useActiveUsersLoading,
  } = useActiveUsers();

  // Fetch user applications when component mounts
  useEffect(() => {
    if (isLoaded && currentUser) {
      fetchChatMessages();
      fetchActiveUsers();
    }
  }, [isLoaded, currentUser, fetchChatMessages, fetchActiveUsers]);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Extracts initials from names
  const getInitials = (...names: (string | null)[]): string => {
    const initials = names.map((name) => (name ? name.trim()[0] : "")).join("");
    return initials;
  };

  // Returns the following data outside this component
  const handleSelectUser = useCallback(
    (
      user: Pick<UserData, "userId" | "firstName" | "lastName" | "imageUrl">
    ) => {
      setSelectedUserId(user.userId as string);
      onSelectUser({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      });
      markChatMessagesAsRead(currentUser?.id as string, user.userId as string);
    },
    [onSelectUser, currentUser, markChatMessagesAsRead]
  );

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return chatUsers.filter(
      (chatUser) =>
        (chatUser.firstName?.toLowerCase() || "").includes(
          lowercasedSearchTerm
        ) ||
        (chatUser.lastName?.toLowerCase() || "").includes(lowercasedSearchTerm)
    );
  }, [searchTerm, chatUsers]);

  // Extract the current time range
  const currentDate = new Date();
  const year = String(currentDate.getFullYear()).slice(-2);
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");

  const formattedHourRange = `${year}-${month}-${day}, ${hours}:00 - ${hours}:59`;

  // Extract active user IDs in the current time range
  const activeUserIds = useMemo(() => {
    return activeUsers
      .filter((entry) => {
        return entry.activeUsersLogId === formattedHourRange;
      })
      .reduce<string[]>((acc, cur) => {
        const ids = cur.users?.map((user) => user.userId);
        return ids ? [...acc, ...ids] : acc;
      }, []);
  }, [activeUsers, formattedHourRange]);

  // Extract unread messages for the current user
  const unreadMessages = chatMessages.filter(
    (message) =>
      message.recipient.userId === currentUser?.id && message.isRead === false
  );

  if (
    !isLoaded ||
    onChartUsersLoading ||
    useActiveUsersLoading ||
    useChatMessagesLoading
  ) {
    return (
      <div className="flex flex-col mb-1">
        <Input placeholder="Search by name" disabled />
        <div className="flex overflow-x-auto space-x-4 p-1">
          {[...Array(16)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 p-1"
            >
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-16 h-4 rounded-sm" />
              <Skeleton className="w-12 h-3 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative">
      <div className="relative">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search a user..."
          className="pl-10"
        />
        <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>
      <div className="flex overflow-x-auto space-x-4 p-1">
        {chatUsers.map((user) => (
          <div
            key={user.userId}
            className={`flex flex-col items-center space-y-1 md:space-y-2 cursor-pointer p-1 ${
              selectedUserId === user.userId ? "bg-muted rounded-sm" : ""
            }`}
            onClick={() => handleSelectUser(user)}
          >
            <div className="relative">
              <Avatar role="button" className="border border-muted-foreground">
                <AvatarImage
                  src={user.imageUrl ? user.imageUrl : ""}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback>
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-background rounded-full ${
                  activeUserIds.includes(user.userId as string)
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              />
              {unreadMessages.some(
                (msg) => msg.sender.userId === user.userId
              ) && (
                <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-600" />
              )}
            </div>
            <h3 className="text-center text-xs text-nowrap">
              {user.firstName} {user.lastName}
            </h3>
            {user.role === "admin" && (
              <div className="text-center text-xs md:text-sm text-muted-foreground">
                Admin
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
