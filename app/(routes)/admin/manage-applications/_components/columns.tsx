import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";

import { ApplicantData } from "@/types/ApplicantData";

import { RowActions } from "./(column-header-controls)/row-actions";
import { DateSubmittedCell } from "./(column-header-controls)/date-submitted-cell";
import { ApplicationStatusCell } from "./(column-header-controls)/application-status-cell";
import { IsEditedCell } from "./(column-header-controls)/is-edited-cell";
import { SelectRow } from "./(column-header-controls)/select-row";
import { BirthdateCell } from "./(column-header-controls)/birthdate-cell";
import { FileUrlCell } from "./(column-header-controls)/file-url-cell";
import { BooleanIconizeCell } from "./(column-header-controls)/boolean-iconize-cell";

export const columns: ColumnDef<ApplicantData>[] = [
  {
    id: "select",
    header: "Select Row",
    cell: ({ row }) => (
      <SelectRow
        row={row}
        applicationId={row.original.applicationId as string} // Pass the applicationId from the row data
        onSelect={(applicationId, selected) => {
          // FOR DEBUGGING PURPOSES
          // console.log(`Applicant ${applicationId} selected: ${selected}`);
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "rowActions",
    header: "Row Actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
  {
    id: "index",
    accessorKey: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
    accessorFn: (row, index) => index + 1,
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
    cell: ({ cell }) => (
      <DateSubmittedCell date={cell.getValue() as string | Date | Timestamp} />
    ),
  },
  {
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
    accessorKey: "isEdited",
    header: "Edited Status",
    cell: ({ cell }) => <IsEditedCell isEdited={cell.getValue() as boolean} />,
  },
  {
    accessorKey: "canEdit",
    header: "Can Edit Response",
    cell: ({ cell }) => (
      <BooleanIconizeCell value={cell.getValue() as boolean} />
    ),
  },
  {
    accessorKey: "applicationId",
    header: "Application ID",
  },
  {
    accessorKey: "activeEmail",
    header: "Active Email Address",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "religion",
    header: "Religion",
  },
  {
    accessorKey: "birthdate",
    header: "Birthdate",
    cell: ({ cell }) => (
      <BirthdateCell timestamp={cell.getValue() as Timestamp} />
    ),
  },
  {
    accessorKey: "birthplace",
    header: "Birthplace",
  },
  {
    accessorKey: "civilStatus",
    header: "Civil Status",
  },
  {
    accessorKey: "birthRank",
    header: "Birth Rank",
  },
  {
    accessorKey: "numBrothers",
    header: "Brothers",
  },
  {
    accessorKey: "numSisters",
    header: "Sisters",
  },
  {
    accessorKey: "numCITBrothersSisters",
    header: "CIT Siblings",
  },
  {
    accessorKey: "homeAddress",
    header: "Home Address",
  },
  {
    accessorKey: "cityAddress",
    header: "City Address",
  },
  {
    accessorKey: "facebookURL",
    header: "FB URL",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile No.",
  },
  {
    accessorKey: "fatherName",
    header: "Father's Name",
  },
  {
    accessorKey: "fatherAge",
    header: "Father's Age",
  },
  {
    accessorKey: "fatherBirthplace",
    header: "Father's Birthplace",
  },
  {
    accessorKey: "fatherNationality",
    header: "Father's Nationality",
  },
  {
    accessorKey: "fatherReligion",
    header: "Father's Religion",
  },
  {
    accessorKey: "fatherEducation",
    header: "Father's Education",
  },
  {
    accessorKey: "fatherOccupation",
    header: "Father's Occupation",
  },
  {
    accessorKey: "motherName",
    header: "Mother's Name",
  },
  {
    accessorKey: "motherAge",
    header: "Mother's Age",
  },
  {
    accessorKey: "motherBirthplace",
    header: "Mother's Birthplace",
  },
  {
    accessorKey: "motherNationality",
    header: "Mother's Nationality",
  },
  {
    accessorKey: "motherReligion",
    header: "Mother's Religion",
  },
  {
    accessorKey: "motherEducation",
    header: "Mother's Education",
  },
  {
    accessorKey: "motherOccupation",
    header: "Mother's Occupation",
  },
  {
    accessorKey: "prevCourse",
    header: "Prev. Course",
  },
  {
    accessorKey: "lastSchool",
    header: "Last School",
  },
  {
    accessorKey: "schoolYear",
    header: "School Year",
  },
  {
    accessorKey: "schoolType",
    header: "School Type",
  },
  {
    accessorKey: "prevSchoolAddress",
    header: "Prev. School Addr.",
  },
  {
    accessorKey: "hsSchoolName",
    header: "HS School",
  },
  {
    accessorKey: "hsSchoolAddress",
    header: "HS Addr.",
  },
  {
    accessorKey: "hsYearGraduated",
    header: "HS Grad. Year",
  },
  {
    accessorKey: "elemSchoolName",
    header: "Elem School",
  },
  {
    accessorKey: "elemSchoolAddress",
    header: "Elem Addr.",
  },
  {
    accessorKey: "elemYearGraduated",
    header: "Elem Grad. Year",
  },
  {
    accessorKey: "progChoice1",
    header: "Program Choice 1",
  },
  {
    accessorKey: "progChoice2",
    header: "Program Choice 2",
  },
  {
    accessorKey: "progChoice3",
    header: "Program Choice 3",
  },
  {
    accessorKey: "emergencyContactName",
    header: "Contact Name",
  },
  {
    accessorKey: "emergencyContactRelationship",
    header: "Relation",
  },
  {
    accessorKey: "emergencyContactAddress",
    header: "Contact Addr.",
  },
  {
    accessorKey: "emergencyContactNumber",
    header: "Contact No.",
  },
  {
    accessorKey: "evalSheet",
    header: "Eval Sheet",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "jobDescription",
    header: "Job Desc.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "missingDocs",
    header: "Missing Docs",
    cell: ({ getValue }) => {
      const missingDocs = getValue() as string[]; // Ensure it's a string array
      return (
        <>
          {missingDocs.length ? (
            <div
              className="h-[60px] w-[400px] overflow-y-scroll rounded p-2"
              style={{ maxWidth: "fit-content" }}
            >
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
    accessorKey: "tor",
    header: "TOR",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "hsForm137A",
    header: "HS Form 137-A",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "hsForm138",
    header: "HS Form 138",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "psaBirthCert",
    header: "PSA Birth Cert.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "transferCred",
    header: "Transfer Cred.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "marriageCert",
    header: "Marriage Cert.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "employmentCert",
    header: "Employment Cert.",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "businessProof",
    header: "Business Proof",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "applicantType",
    header: "Applicant Type",
  },
  {
    accessorKey: "photoWithValidId",
    header: "Photo With Valid ID",
    cell: ({ cell }) => <FileUrlCell fileUrl={cell.getValue() as string} />,
  },
  {
    accessorKey: "examSet",
    header: "Exam Set",
  },
  {
    accessorKey: "firstQuestionAnswer",
    header: "First Question",
  },
  {
    accessorKey: "secondQuestionAnswer",
    header: "Second Question",
  },
  {
    accessorKey: "thirdQuestionAnswer",
    header: "Third Question",
  },
  {
    accessorKey: "fourthQuestionAnswer",
    header: "Fourth Question",
  },
  {
    accessorKey: "fifthQuestionAnswer",
    header: "FifthQuestion",
  },
];
