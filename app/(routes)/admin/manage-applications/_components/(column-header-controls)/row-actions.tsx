import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ApplicantData } from "@/types/ApplicantData";

interface RowActionsProps {
  row: {
    original: ApplicantData;
  };
}

const RowActions: React.FC<RowActionsProps> = ({ row }) => {
  // Function to copy the full row as Spreadsheet pasteable format (Tab-delimited)
  const copyRowAsTabDelimited = () => {
    const tabDelimitedRow = [
      row.original.applicationId,
      row.original.dateSubmitted,
      row.original.applicationStatus,
      row.original.isEdited,
      row.original.firstName,
      row.original.lastName,
      row.original.activeEmail,
      row.original.age,
      row.original.gender,
      row.original.nationality,
      row.original.religion,
      row.original.birthdate,
      row.original.birthplace,
      row.original.civilStatus,
      row.original.birthRank,
      row.original.numBrothers,
      row.original.numSisters,
      row.original.numCITBrothersSisters,
      row.original.homeAddress,
      row.original.cityAddress,
      row.original.facebookURL,
      row.original.mobileNumber,
      row.original.fatherName,
      row.original.fatherAge,
      row.original.fatherBirthplace,
      row.original.fatherNationality,
      row.original.fatherReligion,
      row.original.fatherEducation,
      row.original.fatherOccupation,
      row.original.motherName,
      row.original.motherAge,
      row.original.motherBirthplace,
      row.original.motherNationality,
      row.original.motherReligion,
      row.original.motherEducation,
      row.original.motherOccupation,
      row.original.prevCourse,
      row.original.lastSchool,
      row.original.schoolYear,
      row.original.schoolType,
      row.original.prevSchoolAddress,
      row.original.hsSchoolName,
      row.original.hsSchoolAddress,
      row.original.hsYearGraduated,
      row.original.elemSchoolName,
      row.original.elemSchoolAddress,
      row.original.elemYearGraduated,
      row.original.progChoice1,
      row.original.progChoice2,
      row.original.progChoice3,
      row.original.emergencyContactName,
      row.original.emergencyContactRelationship,
      row.original.emergencyContactAddress,
      row.original.emergencyContactNumber,
      row.original.evalSheet,
      row.original.jobDescription,
      row.original.tor,
     // row.original.hsForm,
      row.original.transferCred,
      row.original.marriageCert,
      row.original.employmentCert,
      row.original.businessProof,
      row.original.applicantType,
      row.original.missingDocs,
      row.original.photoWithValidId,
      row.original.examSet,
      row.original.firstQuestionAnswer,
      row.original.secondQuestionAnswer,
      row.original.thirdQuestionAnswer,
      row.original.fourthQuestionAnswer,
      row.original.fifthQuestionAnswer,
    ].join("\t");

    navigator.clipboard.writeText(tabDelimitedRow).then(() => {
      toast.success("Row copied as Tab-delimited (Excel Pasteable)");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Row Actions</DropdownMenuLabel>

        {/* Copy Firstname Lastname */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(
              `${row.original.firstName} ${row.original.lastName}`
            );
            toast.success("Full Name (Firstname Lastname) copied");
          }}
        >
          Copy Full Name (Firstname Lastname)
        </DropdownMenuItem>

        {/* Copy Lastname, Firstname */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(
              `${row.original.lastName}, ${row.original.firstName}`
            );
            toast.success("Full Name (Lastname, Firstname) copied");
          }}
        >
          Copy Full Name (Lastname, Firstname)
        </DropdownMenuItem>

        {/* Copy Email Address */}
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(row.original.activeEmail);
            toast.success("Email address copied");
          }}
        >
          Copy Email Address
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Copy Entire Row as Tab-delimited */}
        <DropdownMenuItem onClick={copyRowAsTabDelimited}>
          Copy Entire Row (Excel pasteable)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowActions;
