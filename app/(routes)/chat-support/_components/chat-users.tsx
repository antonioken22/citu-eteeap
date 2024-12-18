import { Search } from "lucide-react";
import React, { useState, useCallback, useMemo } from "react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useUserState } from "@/hooks/use-user-state";
import { useChatUsers } from "@/hooks/use-chat-users";
import { useActiveUsers } from "@/hooks/use-active-user";
import { useChatMessages } from "@/hooks/use-chat-messages";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  role: string;
}

interface ChatUsersProps {
  onSelectUser: (user: {
    userId: string;
    userFirstName: string;
    userLastName: string;
    userImageUrl: string | null;
  }) => void;
}

export const ChatUsers = ({ onSelectUser }: ChatUsersProps) => {
  const { userId } = useUserState();
  const { users, loading: usersLoading } = useChatUsers();
  const {
    chatMessages,
    loading: chatMessagesLoading,
    markMessagesAsRead,
  } = useChatMessages();
  const { activeUsers, loading: activeUsersLoading } = useActiveUsers();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Extracts initials from names
  const getInitials = (...names: (string | null)[]): string => {
    const initials = names.map((name) => (name ? name.trim()[0] : "")).join("");
    return initials;
  };

  // Returns the following data outside this component
  const handleSelectUser = useCallback(
    (user: User) => {
      setSelectedUserId(user.id);
      onSelectUser({
        userId: user.id,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        userImageUrl: user.imageUrl,
      });
      markMessagesAsRead(userId || "", user.id);
    },
    [onSelectUser, markMessagesAsRead, userId]
  );

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        (user.firstName?.toLowerCase() || "").includes(lowercasedSearchTerm) ||
        (user.lastName?.toLowerCase() || "").includes(lowercasedSearchTerm)
    );
  }, [searchTerm, users]);

  // Separate admins and users
  const admins = filteredUsers.filter((user) => user.role === "admin");
  const normalUsers = filteredUsers.filter((user) => user.role === "user");

  // Extract the current time range
  const currentDate = new Date();
  const formattedCurrentDate = `${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}-${currentDate.getFullYear()}`;
  const currentHour = currentDate.getHours();
  const hourRangeStart = currentHour % 12 || 12;
  const hourRangePeriod = currentHour < 12 ? "AM" : "PM";
  const formattedHourRange = `${hourRangeStart}:00 - ${hourRangeStart}:59 ${hourRangePeriod}`;

  // Extract active user IDs in the current time range
  const activeUserIds = activeUsers
    .filter((entry) => entry.time === formattedHourRange)
    .reduce<string[]>((acc, cur) => {
      const ids = cur.users.map((user) => user.userId);
      return [...acc, ...ids];
    }, []);

  // Extract unread messages for the current user
  const unreadMessages = chatMessages.filter(
    (message) => message.recipient.userId === userId && message.isRead === false
  );

  if (usersLoading || activeUsersLoading || chatMessagesLoading) {
    return (
      <div className="flex flex-col mb-1">
        <Input placeholder="Search by name" disabled />
        <div className="flex overflow-x-auto space-x-4 p-1">
          {[...Array(8)].map((_, index) => (
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
          className="pl-10" // Adds padding to make space for the icon
        />
        <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>
      <div className="flex overflow-x-auto space-x-4 p-1">
        {[...admins, ...normalUsers].map((user) => (
          <div
            key={user.id}
            className={`flex flex-col items-center space-y-1 md:space-y-2 cursor-pointer p-1 ${
              selectedUserId === user.id ? "bg-muted rounded-sm" : ""
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
                  activeUserIds.includes(user.id)
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              />
              {unreadMessages.some((msg) => msg.sender.userId === user.id) && (
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
