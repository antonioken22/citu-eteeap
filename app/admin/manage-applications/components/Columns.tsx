"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";

import { Checkbox } from "@/components/ui/checkbox";

import { ApplicantData } from "@/types/ApplicantData";

import { ApplicantDataRowActions } from "./ApplicantDataRowActions";
import { DateSubmittedCell } from "./ColumnHeaderControls/DateSubmittedCell";
import { ApplicationStatusCell } from "./ColumnHeaderControls/ApplicationStatusCell";
import { IsEditedCell } from "./ColumnHeaderControls/IsEditedCell";
import { FileUrlCell } from "./ColumnHeaderControls/FileUrlCell";
import { BooleanIconizeCell } from "./ColumnHeaderControls/BooleanIconizeCell";
import { DateFormatCell } from "./ColumnHeaderControls/DateFormatCell";

export const columns: ColumnDef<ApplicantData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex flex-row items-center justify-center space-x-2 pr-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "Row Actions",
    header: "Row Actions",
    cell: ({ row }) => <ApplicantDataRowActions row={row} />,
  },
  {
    id: "Index",
    accessorKey: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
    accessorFn: (row, index) => index + 1,
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    id: "Date Submitted",
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
    cell: ({ cell }) => (
      <DateSubmittedCell date={cell.getValue() as string | Date | Timestamp} />
    ),
  },
  {
    id: "Application Status",
    accessorKey: "applicationStatus",
    header: "Application Status",
    cell: ({ row, cell }) => (
      <ApplicationStatusCell
        applicationId={row.original.applicationId as string}
        isApplicationStatusEdited={
          row.original.isApplicationStatusEdited as boolean
        }
        currentApplicationStatus={(cell.getValue() as string) || "Unreviewed"}
      />
    ),
  },
  {
    id: "Edited Status",
    accessorKey: "isEdited",
    header: "Edited Status",
    cell: ({ cell }) => (
      <IsEditedCell
        isEdited={cell.getValue() as boolean}
        applicationId={cell.row.original.applicationId as string}
        applicantId={cell.row.original.applicantId as string}
        applicantEmail={cell.row.original.activeEmail as string}
      />
    ),
  },
  {
    id: "Can Edit Response",
    accessorKey: "canEdit",
    header: "Can Edit Response",
    cell: ({ cell }) => (
      <BooleanIconizeCell value={cell.getValue() as boolean} />
    ),
  },
  {
    id: "Application ID",
    accessorKey: "applicationId",
    header: "Application ID",
  },

  // SECTION 1: Personal Information
  {
    id: "Applicant ID",
    accessorKey: "applicantId",
    header: "Applicant ID",
  },
  {
    id: "Active Email",
    accessorKey: "activeEmail",
    header: "Active Email Address",
  },
  {
    id: "Last Name",
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    id: "First Name",
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    id: "Age",
    accessorKey: "age",
    header: "Age",
  },
  {
    id: "Gender",
    accessorKey: "gender",
    header: "Gender",
  },
  {
    id: "Nationality",
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    id: "Religion",
    accessorKey: "religion",
    header: "Religion",
  },
  {
    id: "Birthdate",
    accessorKey: "birthdate",
    header: "Birthdate",
    cell: ({ cell }) => (
      <DateFormatCell timestamp={cell.getValue() as Timestamp} />
    ),
  },
  {
    id: "Birthplace",
    accessorKey: "birthplace",
    header: "Birthplace",
  },
  {
    id: "Civil Status",
    accessorKey: "civilStatus",
    header: "Civil Status",
  },
  {
    id: "Birth Rank",
    accessorKey: "birthRank",
    header: "Birth Rank",
  },
  {
    id: "Brothers",
    accessorKey: "numBrothers",
    header: "Brothers",
  },
  {
    id: "Sisters",
    accessorKey: "numSisters",
    header: "Sisters",
  },
  {
    id: "CIT Siblings",
    accessorKey: "numCITBrothersSisters",
    header: "CIT Siblings",
  },
  {
    id: "Home Address",
    accessorKey: "homeAddress",
    header: "Home Address",
  },
  {
    id: "City Address",
    accessorKey: "cityAddress",
    header: "City Address",
  },
  {
    id: "Facebook URL",
    accessorKey: "facebookURL",
    header: "Facebook URL",
  },
  {
    id: "Mobile No.",
    accessorKey: "mobileNumber",
    header: "Mobile No.",
  },

  // SECTION 2: Parents Profile & Emergency Contact
  {
    id: "Father's Name",
    accessorKey: "fatherName",
    header: "Father's Name",
  },
  {
    id: "Father's Age",
    accessorKey: "fatherAge",
    header: "Father's Age",
  },
  {
    id: "Father's Birthplace",
    accessorKey: "fatherBirthplace",
    header: "Father's Birthplace",
  },
  {
    id: "Father's Nationality",
    accessorKey: "fatherNationality",
    header: "Father's Nationality",
  },
  {
    id: "Father's Religion",
    accessorKey: "fatherReligion",
    header: "Father's Religion",
  },
  {
    id: "Father's Education",
    accessorKey: "fatherEducation",
    header: "Father's Education",
  },
  {
    id: "Father's Occupation",
    accessorKey: "fatherOccupation",
    header: "Father's Occupation",
  },
  {
    id: "Mother's Name",
    accessorKey: "motherName",
    header: "Mother's Name",
  },
  {
    id: "Mother's Age",
    accessorKey: "motherAge",
    header: "Mother's Age",
  },
  {
    id: "Mother's Birthplace",
    accessorKey: "motherBirthplace",
    header: "Mother's Birthplace",
  },
  {
    id: "Mother's Nationality",
    accessorKey: "motherNationality",
    header: "Mother's Nationality",
  },
  {
    id: "Mother's Religion",
    accessorKey: "motherReligion",
    header: "Mother's Religion",
  },
  {
    id: "Mother's Education",
    accessorKey: "motherEducation",
    header: "Mother's Education",
  },
  {
    id: "Mother's Occupation",
    accessorKey: "motherOccupation",
    header: "Mother's Occupation",
  },
  {
    id: "Emergency Contact Name",
    accessorKey: "emergencyContactName",
    header: "Emergency Contact Name",
  },
  {
    id: "Emergency Contact Relationship",
    accessorKey: "emergencyContactRelationship",
    header: "Emergency Contact Relationship",
  },
  {
    id: "Emergency Contact Address",
    accessorKey: "emergencyContactAddress",
    header: "Emergency Contact Address",
  },
  {
    id: "Emergency Contact No.",
    accessorKey: "emergencyContactNumber",
    header: "Emergency Contact No.",
  },

  // SECTION 3: Educational Background
  {
    id: "Highest Educational Attainment",
    accessorKey: "educationalAttainment",
    header: "Highest Educational Attainment",
  },
  {
    id: "Prev. Course",
    accessorKey: "prevCourse",
    header: "Prev. Course",
  },
  {
    id: "Last School",
    accessorKey: "lastSchool",
    header: "Last School",
  },
  {
    id: "School Year",
    accessorKey: "schoolYear",
    header: "School Year",
  },
  {
    id: "School Type",
    accessorKey: "schoolType",
    header: "School Type",
  },
  {
    id: "Prev. School Address",
    accessorKey: "prevSchoolAddress",
    header: "Prev. School Address",
  },
  {
    id: "HS School Name",
    accessorKey: "hsSchoolName",
    header: "HS School Name",
  },
  {
    id: "HS School Address",
    accessorKey: "hsSchoolAddress",
    header: "HS School Address",
  },
  {
    id: "HS Grad. Year",
    accessorKey: "hsYearGraduated",
    header: "HS Grad. Year",
  },
  {
    id: "Elem School Name",
    accessorKey: "elemSchoolName",
    header: "Elem School",
  },
  {
    id: "Elem School Address",
    accessorKey: "elemSchoolAddress",
    header: "Elem Address",
  },
  {
    id: "Elem Grad. Year",
    accessorKey: "elemYearGraduated",
    header: "Elem Grad. Year",
  },
  {
    id: "Program Choice 1",
    accessorKey: "progChoice1",
    header: "Program Choice 1",
  },
  {
    id: "Program Choice 2",
    accessorKey: "progChoice2",
    header: "Program Choice 2",
  },
  {
    id: "Program Choice 3",
    accessorKey: "progChoice3",
    header: "Program Choice 3",
  },

  // SECTION 4: Requirement Documents
  {
    id: "Eval Sheet",
    accessorKey: "evalSheet",
    header: "Eval Sheet",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    id: "Job Desc.",
    accessorKey: "jobDescription",
    header: "Job Desc.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  // Missing Docs
  {
    id: "Missing Docs",
    accessorKey: "missingDocs",
    header: "Missing Docs",
    cell: ({ getValue }) => {
      const missingDocs = getValue() as string[]; // Ensure it's a string array
      return (
        <>
          {missingDocs.length ? (
            <div className="h-[60px] w-[400px] overflow-y-auto rounded p-2">
              <ol className="list-decimal pl-5">
                {missingDocs.map((doc, index) => (
                  <li key={index} className="text-sm break-words">
                    {doc}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center">
              No missing documents.
            </p>
          )}
        </>
      );
    },
  },
  {
    id: "Employment Cert.",
    accessorKey: "employmentCert",
    header: "Employment Cert.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    id: "TOR",
    accessorKey: "tor",
    header: "TOR",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    id: "PSA Birth Cert.",
    accessorKey: "psaBirthCert",
    header: "PSA Birth Cert.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    id: "Transfer Cred.",
    accessorKey: "transferCred",
    header: "Transfer Cred.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    id: "Business Proof",
    accessorKey: "businessProof",
    header: "Business Proof",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    id: "HS Form 137-A",
    accessorKey: "hsForm137A",
    header: "HS Form 137-A",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    id: "HS Form 138",
    accessorKey: "hsForm138",
    header: "HS Form 138",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    id: "Marriage Cert.",
    accessorKey: "marriageCert",
    header: "Marriage Cert.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    id: "Applicant Type",
    accessorKey: "applicantType",
    header: "Applicant Type",
  },
  {
    id: "Photo With Valid ID",
    accessorKey: "photoWithValidId",
    header: "Photo With Valid ID",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },

  // SECTION 5: Essay Admission Test
  {
    id: "Exam Set",
    accessorKey: "examSet",
    header: "Exam Set",
  },
  {
    id: "First Question Answer",
    accessorKey: "firstQuestionAnswer",
    header: "First Question Answer",
  },
  {
    id: "Second Question Answer",
    accessorKey: "secondQuestionAnswer",
    header: "Second Question Answer",
  },
  {
    id: "Third Question Answer",
    accessorKey: "thirdQuestionAnswer",
    header: "Third Question Answer",
  },
  {
    id: "Fourth Question Answer",
    accessorKey: "fourthQuestionAnswer",
    header: "Fourth Question Answer",
  },
  {
    id: "Fifth Question Answer",
    accessorKey: "fifthQuestionAnswer",
    header: "Fifth Question Answer",
  },
];
