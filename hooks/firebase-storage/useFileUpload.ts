"use client";

import { useState } from "react";
import { storage } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { toast } from "sonner";

import { useUser } from "@clerk/nextjs";

export const useFileUpload = () => {
  const { user } = useUser();
  const [selectedFileUpload, setSelectedFileUpload] = useState<File | null>(
    null
  );

  const uploadPhoto = async (
    folder: string = "file-uploads",
    fieldName: string
  ): Promise<string | null> => {
    if (selectedFileUpload == null) {
      toast.error("No file chosen. Please select a file to upload.");
      return null;
    }

    // Display loading toast
    const loadingToastId = toast.loading("Uploading your file...");

    try {
      // Timestamp parser for unique file naming
      const timestamp = new Date()
        .toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(",", " @")
        .replace(/\//g, "-");

      const fileRef = ref(
        storage,
        `${folder}/${fieldName} ${user?.firstName} ${user?.lastName} ${timestamp}`
      );

      // Upload the file to Firebase
      const snapshot = await uploadBytes(fileRef, selectedFileUpload);

      // Get the download URL of the uploaded file
      const url = await getDownloadURL(snapshot.ref);

      // Reset file selection state
      setSelectedFileUpload(null);

      // Update toast to success state
      toast.success("File uploaded successfully.", { id: loadingToastId });

      return url; // Return the file URL
    } catch (error) {
      console.error("File upload error:", error);

      // Update toast to error state
      toast.error("Failed to upload file.", { id: loadingToastId });

      return null; // Return null on failure
    }
  };

  return {
    selectedFileUpload,
    setSelectedFileUpload,
    uploadPhoto,
  };
};
