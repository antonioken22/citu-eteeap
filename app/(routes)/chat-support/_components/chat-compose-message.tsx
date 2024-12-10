import { toast } from "sonner";
import { Send } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ChatMessage } from "@/types/ChatMessage";
import { useUserState } from "@/hooks/use-user-state";
import { useChatMessages } from "@/hooks/use-chat-messages";

interface ChatComposeMessageProps {
  selectedUser: {
    userId: string;
    userFirstName: string;
    userLastName: string;
    userImageUrl: string | null;
  } | null;
}

export const ChatComposeMessage = ({
  selectedUser,
}: ChatComposeMessageProps) => {
  const { userId, userFirstName, userLastName } = useUserState();
  const { addChatMessage } = useChatMessages();
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message.trim() && selectedUser) {
      const newChatMessage: ChatMessage = {
        message,
        isRead: false,
        isView: true,
        sender: {
          userId: userId || "",
          userFirstName: userFirstName || "",
          userLastName: userLastName || "",
        },
        recipient: {
          userId: selectedUser.userId,
          userFirstName: selectedUser.userFirstName,
          userLastName: selectedUser.userLastName,
        },
      };
      await addChatMessage(newChatMessage);
      setMessage("");
    } else if (!selectedUser) {
      toast.warning("No user selected.");
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
