"use client";

import { useUserState } from "@/hooks/use-user-state";

import { ChatUI } from "./_components/chat-ui";

export const UserChatView = () => {
  const { userId, loading } = useUserState();

  return (
    <>
      {!loading && userId && (
        <div>
          <div className="px-4 lg:px-8 pt-4">
            <ChatUI />
          </div>
        </div>
      )}
    </>
  );
};
