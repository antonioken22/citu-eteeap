import { toast } from "sonner";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "@/firebase/config";

export const useFileUpload = () => {
  const { user } = useUser();
  const [selectedFileUpload, setSelectedFileUpload] = useState<File | null>(null);
  const [fileUrls, setFileUrls] = useState<{ [key: string]: string | null }>({});

  const uploadPhoto = (folder: string = "file-uploads", fieldName: string) => {
    if (selectedFileUpload == null) {
      toast.error("No file chosen. Please select a file to upload.");
      return;
    }

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

    toast.promise(
      uploadBytes(fileRef, selectedFileUpload).then((snapshot) =>
        getDownloadURL(snapshot.ref).then((url) => {
          setFileUrls((prev) => ({ ...prev, [fieldName]: url }));
          setSelectedFileUpload(null);
        })
      ),
      {
        loading: "Uploading your file...",
        success: "File uploaded successfully.",
        error: "Failed to upload file.",
      }
    );
  };

  return {
    selectedFileUpload,
    setSelectedFileUpload,
    uploadPhoto,
    fileUrls,
    setFileUrls,
  };
};
