"use client";

import { Timestamp } from "firebase/firestore";

type DateFormatCellProps = {
  timestamp: Timestamp | Date | null;
};

export const DateFormatCell: React.FC<DateFormatCellProps> = ({
  timestamp,
}) => {
  if (!timestamp) {
    return <div>{""}</div>;
  }

  const date =
    timestamp instanceof Date
      ? timestamp
      : timestamp && typeof (timestamp as Timestamp).toDate === "function"
      ? (timestamp as Timestamp).toDate()
      : null;

  if (!date) {
    return <div>{""}</div>;
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return <div className="min-w-[100px]">{formattedDate}</div>;
};
