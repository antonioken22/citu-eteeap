import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Table as ReactTable } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ApplicantData } from "@/types/ApplicantData";

interface FilterAndColumnControlsProps {
  table: ReactTable<ApplicantData>;
}

export function FilterAndColumnControls({
  table,
}: FilterAndColumnControlsProps) {
  const [globalFilter, setGlobalFilter] = useState(""); // State for global filter

  // Set default hidden columns
  useMemo(() => {
    const hiddenColumns = [
      "applicationId",
      // "dateSubmitted",
      // "applicationStatus",
      // "isEdited",

      // SECTION 1: Personal Information
      "applicantId",
      // "activeEmail",
      // "lastName",
      // "firstName",
      "age",
      // "gender",
      "nationality",
      "religion",
      "birthdate",
      "birthplace",
      "civilStatus",
      "birthRank",
      "numBrothers",
      "numSisters",
      "numCITBrothersSisters",
      "homeAddress",
      "cityAddress",
      "facebookURL",
      "mobileNumber",

      // SECTION 2: Parents Profile & Emergency Contact
      "fatherName",
      "fatherAge",
      "fatherBirthplace",
      "fatherNationality",
      "fatherReligion",
      "fatherEducation",
      "fatherOccupation",
      "motherName",
      "motherAge",
      "motherBirthplace",
      "motherNationality",
      "motherReligion",
      "motherEducation",
      "motherOccupation",
      "emergencyContactName",
      "emergencyContactRelationship",
      "emergencyContactAddress",
      "emergencyContactNumber",

      // SECTION 3: Educational Background
      // "educationalAttainment",
      "prevCourse",
      "lastSchool",
      "schoolYear",
      "schoolType",
      "prevSchoolAddress",
      "hsSchoolName",
      "hsSchoolAddress",
      "hsYearGraduated",
      "elemSchoolName",
      "elemSchoolAddress",
      "elemYearGraduated",
      // "progChoice1",
      "progChoice2",
      "progChoice3",

      // SECTION 4: Requirement Documents
      // "evalSheet",
      // "jobDescription",
      // "tor",
      // "hsForm137A",
      // "hsForm138",
      // "transferCred",
      // "marriageCert",
      // "employmentCert",
      // "businessProof",
      "applicantType",
      // "missingDocs",
      // "photoWithValidId",

      // SECTION 5: Essay Admission Test
      "examSet",
      "firstQuestionAnswer",
      "secondQuestionAnswer",
      "thirdQuestionAnswer",
      "fourthQuestionAnswer",
      "fifthQuestionAnswer",
    ];

    hiddenColumns.forEach((col) => {
      table.getColumn(col)?.toggleVisibility(false);
    });
  }, [table]);

  // Global filter handler
  const handleGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
    table.setGlobalFilter(e.target.value);
  };

  return (
    <div className="flex items-center py-4">
      {/* Global Filter Input */}
      <Input
        placeholder="Global filter..."
        value={globalFilter}
        onChange={handleGlobalFilterChange}
        className="max-w-sm"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
