"use client";

import { Check, X } from "lucide-react";

type BooleanIconizeCellProps = {
  value: boolean;
};

export const BooleanIconizeCell = ({ value }: BooleanIconizeCellProps) => {
  return (
    <div className="flex justify-center items-center">
      {value ? (
        <Check className="text-green-600 dark:text-green-500" size={20} />
      ) : (
        <X className="text-red-600 dark:text-red-500" size={20} />
      )}
    </div>
  );
};
