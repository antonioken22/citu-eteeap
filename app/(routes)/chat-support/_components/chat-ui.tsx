import React, { useState } from "react";
import { ChatUsers } from "./chat-users";
import { ChatMessageHistory } from "./chat-message-history";
import { ChatComposeMessage } from "./chat-compose-message";

export const ChatUI = () => {
  const [selectedUser, setSelectedUser] = useState<{
    userId: string;
    userFirstName: string;
    userLastName: string;
    userImageUrl: string | null;
  } | null>(null);

  return (
    <div className="flex flex-col">
      <ChatUsers onSelectUser={setSelectedUser} />
      <hr />
      <div className="h-[59vh] md:h-[60vh] overflow-y-auto">
        <ChatMessageHistory selectedUser={selectedUser} />
      </div>
      <div className="bottom-0">
        <hr />
        <ChatComposeMessage selectedUser={selectedUser} />
      </div>
    </div>
  );
};
