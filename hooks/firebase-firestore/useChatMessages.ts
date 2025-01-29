"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { firestore } from "@/firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  query,
  onSnapshot,
  where,
  Unsubscribe,
} from "firebase/firestore";

import { toast } from "sonner";

import { ChatMessage } from "@/types/ChatMessage";

import { useUser } from "@clerk/nextjs";

export const useChatMessages = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const userUnsubscribeRef = useRef<Unsubscribe | null>(null);
  const adminUnsubscribeRef = useRef<Unsubscribe | null>(null);

  // Cleanup onSnapshot subscriptions on unmount
  useEffect(() => {
    return () => {
      if (userUnsubscribeRef.current) {
        userUnsubscribeRef.current();
        userUnsubscribeRef.current = null;
      }
      if (adminUnsubscribeRef.current) {
        adminUnsubscribeRef.current();
        adminUnsubscribeRef.current = null;
      }
    };
  }, []);

  // READ user chat messages (USER)
  const fetchChatMessages = useCallback(() => {
    if (!user) {
      toast.error("You are not logged in.");
      return;
    }

    // Clean up existing subscription if any
    if (userUnsubscribeRef.current) {
      userUnsubscribeRef.current();
    }

    setLoading(true);

    const q = query(collection(firestore, "chatMessages"));

    userUnsubscribeRef.current = onSnapshot(
      q,
      (querySnapshot) => {
        const messages: ChatMessage[] = [];
        querySnapshot.forEach((doc) => {
          messages.push({ ...doc.data() } as ChatMessage);
        });
        setChatMessages(messages);
        setLoading(false);
      },
      (error) => {
        toast.error("Error fetching messages: " + error);
        console.error("Error fetching messages: " + error);
        setLoading(false);
      }
    );

    return () => {
      if (userUnsubscribeRef.current) {
        userUnsubscribeRef.current();
        userUnsubscribeRef.current = null;
      }
    };
  }, [user]);

  // CREATE chat message (USER)
  const addChatMessage = useCallback(
    async (newChatMessage: ChatMessage) => {
      if (!user) {
        toast.error("You are not logged in.");
        return;
      }

      setLoading(true);

      const chatMessageWithDateCreated = {
        ...newChatMessage,
        message: newChatMessage.message,
        dateCreated: new Date(),
      };

      try {
        await addDoc(
          collection(firestore, "chatMessages"),
          chatMessageWithDateCreated
        );
        setChatMessages((prevChatMessages) => [
          ...prevChatMessages,
          chatMessageWithDateCreated,
        ]);
      } catch (error) {
        toast.error("Failed to send message: " + error);
        console.error("Failed to send message: " + error);
      }
    },
    [user]
  );

  // UPDATE chat message isRead (USER)
  const markChatMessagesAsRead = useCallback(
    async (currentUserId: string, chatUserId: string) => {
      if (!user) {
        toast.error("You are not logged in.");
        return;
      }

      setLoading(true);

      try {
        const q = query(
          collection(firestore, "chatMessages"),
          where("sender.userId", "in", [currentUserId, chatUserId]),
          where("recipient.userId", "in", [currentUserId, chatUserId]),
          where("isRead", "==", false)
        );

        const querySnapshot = await getDocs(q);
        const updatePromises = querySnapshot.docs.map((doc) =>
          updateDoc(doc.ref, { isRead: true })
        );

        await Promise.all(updatePromises);

        setChatMessages((prevChatMessages) =>
          prevChatMessages.map((message) =>
            (message.sender.userId === currentUserId &&
              message.recipient.userId === chatUserId) ||
            (message.sender.userId === chatUserId &&
              message.recipient.userId === currentUserId)
              ? { ...message, isRead: true }
              : message
          )
        );
      } catch (error) {
        toast.error("Failed to mark messages as read: " + error);
        console.error("Failed to mark messages as read: " + error);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // SOFT DELETE chat message (USER)
  const softDeleteChatMessage = useCallback(
    async (chatMessageId: string) => {
      if (!user) {
        toast.error("You are not logged in.");
        return;
      }

      setLoading(true);

      try {
        const messageDoc = doc(firestore, "chatMessages", chatMessageId);
        await updateDoc(messageDoc, { isView: false });
        setChatMessages((prevChatMessages) =>
          prevChatMessages.map((message) =>
            message.chatMessageId === chatMessageId
              ? { ...message, isView: false }
              : message
          )
        );
        toast.success("Message deleted.");
      } catch (error) {
        toast.error("Failed to delete message: " + error);
        console.error("Failed to delete message: " + error);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return {
    chatMessages,
    fetchChatMessages,
    addChatMessage,
    markChatMessagesAsRead,
    softDeleteChatMessage,
    loading,
  };
};
