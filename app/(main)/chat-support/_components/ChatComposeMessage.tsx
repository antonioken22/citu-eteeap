"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { UserData } from "@/types/UserData";
import { ChatMessage } from "@/types/ChatMessage";

import { useUser } from "@clerk/nextjs";
import { useChatMessages } from "@/hooks/firebase-firestore/use-chat-messages";

type ChatComposeMessageProps = {
  selectedUser: Partial<UserData> | null;
};

export const ChatComposeMessage = ({
  selectedUser,
}: ChatComposeMessageProps) => {
  const { user } = useUser();
  const { addChatMessage } = useChatMessages();
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!selectedUser) {
      toast.error("No user selected.");
      return;
    }

    if (!message) {
      toast.error("Please enter a message.");
      return;
    }

    if (message.trim() && selectedUser) {
      const newChatMessage: ChatMessage = {
        message,
        isRead: false,
        isView: true,
        sender: {
          userId: user?.id as string,
          userFirstName: user?.firstName as string,
          userLastName: user?.lastName as string,
        },
        recipient: {
          userId: selectedUser.userId as string,
          userFirstName: selectedUser.firstName as string,
          userLastName: selectedUser.lastName as string,
        },
      };
      await addChatMessage(newChatMessage);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-grow border-primary"
      />
      <Button
        onClick={handleSend}
        className="h-20 flex items-center justify-center"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
};
