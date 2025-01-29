"use client";

import { PersonalInformation } from "./components/PersonalInfo";
import { ParentsInformation } from "./components/ParentsInfo";
import { SchoolInformation } from "./components/SchoolInfo";

import { ApplicantData } from "@/types/ApplicantData";

export const UserProfileView = ({
  applicantData,
}: {
  applicantData: ApplicantData;
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-6">
      <PersonalInformation applicantData={applicantData} />
      <ParentsInformation applicantData={applicantData} />
      <SchoolInformation applicantData={applicantData} />
    </div>
  );
};
