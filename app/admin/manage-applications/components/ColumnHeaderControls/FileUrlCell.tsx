"use client";

import { useState } from "react";
import Link from "next/link";

import { toast } from "sonner";
import { Clipboard, Check } from "lucide-react";

type FileUrlCellProps = {
  fileUrl?: string;
};

export const FileUrlCell = ({ fileUrl }: FileUrlCellProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!fileUrl) {
      toast.error("File URL not found.");
      return;
    }

    try {
      await navigator.clipboard.writeText(fileUrl);
      toast.success("File URL copied to clipboard.");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy text.");
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-[100px] space-x-2">
      {fileUrl ? (
        <div className="flex items-center w-full">
          <Link href={fileUrl} target="_blank" className="flex-1 truncate">
            <span className="text-xs text-blue-600 underline">{fileUrl}</span>
          </Link>
          <button
            onClick={handleCopy}
            className="ml-2 p-1 rounded hover:bg-gray-100 focus:outline-none"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Clipboard className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center">
          Not provided.
        </p>
      )}
    </div>
  );
};
