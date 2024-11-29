"use client";

import { PersonalInformation } from "./components/personal-info";
import { ParentsInformation } from "./components/parents-info";
import { SchoolInformation } from "./components/school-info";

export const UserProfileView = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-6">
      <PersonalInformation />
      <ParentsInformation />
      <SchoolInformation />
    </div>
  );
};
