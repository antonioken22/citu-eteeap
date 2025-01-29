"use client";

import { useEffect, useRef } from "react";

import { Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Timestamp } from "firebase/firestore";
import { UserData } from "@/types/UserData";
import { ChatMessage } from "@/types/ChatMessage";

import { useUser } from "@clerk/nextjs";
import { useChatMessages } from "@/hooks/firebase-firestore/useChatMessages";

interface ChatMessageHistoryProps {
  selectedUser: Partial<UserData> | null;
}

export const ChatMessageHistory = ({
  selectedUser,
}: ChatMessageHistoryProps) => {
  const { user, isLoaded } = useUser();
  const {
    chatMessages,
    fetchChatMessages,
    softDeleteChatMessage,
    loading: useChatMessagesLoading,
  } = useChatMessages();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch when component mounts
  useEffect(() => {
    if (isLoaded && user) {
      fetchChatMessages();
    }
  }, [isLoaded, user, fetchChatMessages]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, selectedUser]);

  const formatDate = (timestamp: Timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString(undefined, options);
  };

  const filteredMessages = chatMessages
    .filter(
      (msg: ChatMessage) =>
        (msg.sender.userId === user?.id &&
          msg.recipient.userId === selectedUser?.userId) ||
        (msg.sender.userId === selectedUser?.userId &&
          msg.recipient.userId === user?.id)
    )
    .sort((a, b) => {
      const dateA = (a.dateCreated as unknown as Timestamp)?.seconds ?? 0;
      const dateB = (b.dateCreated as unknown as Timestamp)?.seconds ?? 0;
      // Sort in ascending order
      // (newest at bottom: oldest at top)
      return dateA - dateB;
    });

  if (!isLoaded || useChatMessagesLoading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(16)].map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-grow space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="text-center text-muted-foreground py-4">
        Select a user to start chatting.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-7 ">
      {filteredMessages.length === 0 ? (
        <div className="text-center text-muted-foreground py-4">
          Start a conversation
        </div>
      ) : (
        filteredMessages.map((msg) => {
          const isCurrentUser = msg.sender.userId === user?.id;
          return (
            <div
              key={msg.chatMessageId}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUser && (
                <Avatar className="w-10 h-10 border border-muted-foreground mr-2">
                  <AvatarImage src={selectedUser?.imageUrl ?? undefined} />
                  <AvatarFallback>
                    {selectedUser?.firstName?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`flex flex-col${
                  isCurrentUser ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`relative break-words max-w-[64vw] md:max-w-[50vw] ${
                    isCurrentUser
                      ? "border border-primary bg-muted text-primary"
                      : "border border-muted-foreground bg-muted text-muted-foreground"
                  } p-2 rounded-lg`}
                >
                  <div className="text-sm md:text-base font-bold">
                    {isCurrentUser
                      ? `${user?.firstName ?? "Unknown"} ${
                          user?.lastName ?? "User"
                        }`
                      : `${selectedUser.firstName} ${selectedUser.lastName}`}
                  </div>
                  <div className="text-sm md:text-base">
                    {msg.isView ? (
                      msg.message
                    ) : (
                      <i className="text-xs">Message deleted</i>
                    )}
                  </div>
                  {isCurrentUser && msg.isView && (
                    <button
                      className="absolute -top-0 -left-6"
                      onClick={() =>
                        softDeleteChatMessage(msg.chatMessageId || "")
                      }
                    >
                      <Trash className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                  <div className="text-xs text-muted-foreground absolute -bottom-5 -left-0 text-nowrap">
                    {`Sent at: ${formatDate(
                      msg.dateCreated as unknown as Timestamp
                    )}`}
                  </div>
                </div>
              </div>
              {isCurrentUser && (
                <Avatar className="w-10 h-10 border border-primary ml-2">
                  <AvatarImage src={user?.imageUrl ?? undefined} />
                  <AvatarFallback>{user?.firstName?.[0] ?? "U"}</AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
