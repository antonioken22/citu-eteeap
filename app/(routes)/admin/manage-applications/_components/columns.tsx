import { ColumnDef } from "@tanstack/react-table";

import { ApplicantData } from "@/types/ApplicantData";
import RowActions from "./row-actions";
import DateSubmittedCell from "./date-submitted-cell";
import ApplicationStatusCell from "./application-status-cell";
import IsEditedCell from "./is-edited-cell";

export const columns: ColumnDef<ApplicantData>[] = [
  {
    id: "rowActions",
    header: "Row Actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
  {
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
    cell: ({ cell }) => (
      <DateSubmittedCell date={cell.getValue() as string | Date} />
    ),
  },
  {
    accessorKey: "applicationStatus",
    header: "Application Status",
    cell: ({ cell }) => (
      <ApplicationStatusCell
        status={(cell.getValue() as string) || "Unreviewed"}
      />
    ),
  },
  {
    accessorKey: "isEdited",
    header: "Edited Status",
    cell: ({ cell }) => <IsEditedCell isEdited={cell.getValue() as boolean} />,
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
    header: "Program 1",
  },
  {
    accessorKey: "progChoice2",
    header: "Program 2",
  },
  {
    accessorKey: "progChoice3",
    header: "Program 3",
  },
  {
    accessorKey: "contactName",
    header: "Contact Name",
  },
  {
    accessorKey: "relation",
    header: "Relation",
  },
  {
    accessorKey: "contactAddress",
    header: "Contact Addr.",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact No.",
  },
  {
    accessorKey: "evalSheet",
    header: "Eval Sheet",
  },
  {
    accessorKey: "jobDescription",
    header: "Job Desc.",
  },
  {
    accessorKey: "tor",
    header: "TOR",
  },
  {
    accessorKey: "hsForm",
    header: "HS Form",
  },
  {
    accessorKey: "transferCred",
    header: "Transfer Cred.",
  },
  {
    accessorKey: "marriageCert",
    header: "Marriage Cert.",
  },
  {
    accessorKey: "employmentCert",
    header: "Employment Cert.",
  },
  {
    accessorKey: "businessProof",
    header: "Business Proof",
  },
  {
    accessorKey: "applicantType",
    header: "Applicant Type",
  },
  {
    accessorKey: "missingDocs",
    header: "Missing Docs",
  },
  {
    accessorKey: "photoWithID",
    header: "Photo ID",
  },
  {
    accessorKey: "examSet",
    header: "Exam Set",
  },
  {
    accessorKey: "firstQuestion",
    header: "First Question",
  },
  {
    accessorKey: "secondQuestion",
    header: "Second Question",
  },
  {
    accessorKey: "thirdQuestion",
    header: "Third Question",
  },
  {
    accessorKey: "fourthQuestion",
    header: "Fourth Question",
  },
  {
    accessorKey: "fifthQuestion",
    header: "FifthQuestion",
  },
];
