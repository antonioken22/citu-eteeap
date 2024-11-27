import React from "react";
import { Row } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { ApplicantData } from "@/types/ApplicantData";

interface SelectRowProps {
  row: Row<ApplicantData>;
  applicationId: string;
  onSelect: (applicationId: string, selected: boolean) => void;
}

export const SelectRow: React.FC<SelectRowProps> = ({
  row,
  applicationId,
  onSelect,
}) => {
  const handleSelectChange = (value: boolean) => {
    row.toggleSelected(!!value); // Toggle the row's selection in the table
    onSelect(applicationId, value); // Pass the applicationId and the selection state to the callback
  };

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={handleSelectChange}
      aria-label={`Select applicant ${applicationId}`}
      className="ml-3"
    />
  );
};
