import React from "react";
import { Timestamp } from "firebase/firestore";

// Firestore timestamp is expected to be passed in
interface BirthdateCellProps {
  timestamp: Timestamp | Date; // Accept Firestore Timestamp or a Date object
}

const BirthdateCell: React.FC<BirthdateCellProps> = ({ timestamp }) => {
  const date = timestamp instanceof Date ? timestamp : timestamp.toDate(); // Convert Firestore timestamp to Date

  // Format the date as MMM/DD/YYYY, e.g., Jan 4, 1999
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short", // Short month format, e.g., Jan
    day: "numeric", // Day of the month, e.g., 4
    year: "numeric", // Full year, e.g., 1999
  });

  return <span>{formattedDate}</span>;
};

export default BirthdateCell;
