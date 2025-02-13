"use client";

import { useState } from "react";
import { storage } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { toast } from "sonner";

import { Timestamp } from "firebase/firestore";

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
      // Use Firestore server timestamp for consistency
      const serverTimestamp = Timestamp.now().toDate(); // Converts Firestore timestamp to Date

      // Format for folder structure (YY-MM)
      const year = String(serverTimestamp.getFullYear()).slice(-2); // "25"
      const month = String(serverTimestamp.getMonth() + 1).padStart(2, "0"); // "02"
      const day = String(serverTimestamp.getDate()).padStart(2, "0"); // "05"
      const hours = String(serverTimestamp.getHours()).padStart(2, "0"); // "17"
      const minutes = String(serverTimestamp.getMinutes()).padStart(2, "0"); // "25"
      const seconds = String(serverTimestamp.getSeconds()).padStart(2, "0"); // "55"

      // Construct folder path and filename
      const monthFolder = `${year}-${month}`; // "25-02"
      const timestamp = `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`; // "25-02-05, 17:25:55"

      const filePath = `${monthFolder}/${folder}/${fieldName} ${user?.firstName} ${user?.lastName} ${timestamp}`;

      const fileRef = ref(storage, filePath);

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
      console.error("File upload error: " + error);

      // Update toast to error state
      toast.error("Failed to upload file: " + error, { id: loadingToastId });

      return null; // Return null on failure
    }
  };

  return {
    selectedFileUpload,
    setSelectedFileUpload,
    uploadPhoto,
  };
};
