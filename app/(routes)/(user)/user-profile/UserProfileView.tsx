"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ApplicantData } from "@/types/ApplicantData";

import { Tab1 } from "./components/Tab1";
import { Tab2 } from "./components/Tab2";
import { Tab3 } from "./components/Tab3";
import { Tab4 } from "./components/Tab4";
import { Tab5 } from "./components/Tab5";

interface UserProfileViewProps {
  application?: ApplicantData;
}

export const UserProfileView = ({ application }: UserProfileViewProps) => {
  const [formData, setFormData] = useState<ApplicantData | any>(() => {
    return {
      isSubmitted: application?.isSubmitted ?? false,
      applicationStatus: application?.applicationStatus ?? "",
      isEdited: application?.isEdited ?? false,

      isQuestionReadAndUnderstood:
        application?.isQuestionReadAndUnderstood ?? false,
      isPrivacyNoticeAccepted: application?.isPrivacyNoticeAccepted ?? false,
      isWaiverAccepted: application?.isWaiverAccepted ?? false,

      // SECTION 1: Personal Information
      // Personal
      applicantId: application?.applicantId ?? "",
      activeEmail: application?.activeEmail ?? "",
      lastName: application?.lastName ?? "",
      firstName: application?.firstName ?? "",
      age: application?.age ?? 0,
      gender: application?.gender ?? "",
      nationality: application?.nationality ?? "",
      religion: application?.religion ?? "",
      birthdate: application?.birthdate ?? "",
      birthplace: application?.birthplace ?? "",
      civilStatus: application?.civilStatus ?? "",
      // Family
      birthRank: application?.birthRank ?? "",
      numBrothers: application?.numBrothers ?? "",
      numSisters: application?.numSisters ?? "",
      numCITBrothersSisters: application?.numCITBrothersSisters ?? "",
      // Address
      homeAddress: application?.homeAddress ?? "",
      cityAddress: application?.cityAddress ?? "",
      // Social
      facebookURL: application?.facebookURL ?? "",
      mobileNumber: application?.mobileNumber ?? "",

      // SECTION 2: Parents Profile & Emergency Contact
      // Father's Profile
      fatherName: application?.fatherName ?? "",
      fatherAge: application?.fatherAge ?? "",
      fatherBirthplace: application?.fatherBirthplace ?? "",
      fatherNationality: application?.fatherNationality ?? "",
      fatherReligion: application?.fatherReligion ?? "",
      fatherEducation: application?.fatherEducation ?? "",
      fatherOccupation: application?.fatherOccupation ?? "",
      // Mother's Profile
      motherName: application?.motherName ?? "",
      motherAge: application?.motherAge ?? "",
      motherBirthplace: application?.motherBirthplace ?? "",
      motherNationality: application?.motherNationality ?? "",
      motherReligion: application?.motherReligion ?? "",
      motherEducation: application?.motherEducation ?? "",
      motherOccupation: application?.motherOccupation ?? "",
      // Emergency Contact
      emergencyContactName: application?.emergencyContactName ?? "",
      emergencyContactRelationship:
        application?.emergencyContactRelationship ?? "",
      emergencyContactAddress: application?.emergencyContactAddress ?? "",
      emergencyContactNumber: application?.emergencyContactNumber ?? "",

      // SECTION 3: Educational Background
      educationalAttainment: application?.educationalAttainment ?? "",
      // Previous Education
      prevCourse: application?.prevCourse ?? "",
      lastSchool: application?.lastSchool ?? "",
      schoolYear: application?.schoolYear ?? "",
      schoolType: application?.schoolType ?? "",
      prevSchoolAddress: application?.prevSchoolAddress ?? "",
      // High School
      hsSchoolName: application?.hsSchoolName ?? "",
      hsSchoolAddress: application?.hsSchoolAddress ?? "",
      hsYearGraduated: application?.hsYearGraduated ?? "",
      // Elementary
      elemSchoolName: application?.elemSchoolName ?? "",
      elemSchoolAddress: application?.elemSchoolAddress ?? "",
      elemYearGraduated: application?.elemYearGraduated ?? "",

      // Program Choices
      progChoice1: application?.progChoice1 ?? "",
      progChoice2: application?.progChoice2 ?? "",
      progChoice3: application?.progChoice3 ?? "",

      // SECTION 4: Requirement Documents
      applicantType: application?.applicantType ?? "",
      // Pre-evaluation Requirements
      evalSheet: application?.evalSheet ?? "",
      jobDescription: application?.jobDescription ?? "",
      // Other Requirements
      tor: application?.tor ?? "",
      hsForm137A: application?.hsForm137A ?? "",
      hsForm138: application?.hsForm138 ?? "",
      psaBirthCert: application?.psaBirthCert ?? "",
      transferCred: application?.transferCred ?? "",
      marriageCert: application?.marriageCert ?? "",
      employmentCert: application?.employmentCert ?? "",
      businessProof: application?.businessProof ?? "",
      // Undertaking/Waiver
      missingDocs: application?.missingDocs ?? "",
      photoWithValidId: application?.photoWithValidId ?? "",

      // SECTION 5: Essay Admission Test
      examSet: application?.examSet ?? "",
      // Answers
      firstQuestionAnswer: application?.firstQuestionAnswer ?? "",
      secondQuestionAnswer: application?.secondQuestionAnswer ?? "",
      thirdQuestionAnswer: application?.thirdQuestionAnswer ?? "",
      fourthQuestionAnswer: application?.fourthQuestionAnswer ?? "",
      fifthQuestionAnswer: application?.fifthQuestionAnswer ?? "",
    };
  });

  // Function to update form data and save to localStorage
  const updateFormData = (newData: Partial<ApplicantData>) => {
    setFormData((prevData: ApplicantData) => {
      const updatedData = { ...prevData, ...newData };
      localStorage.setItem("userProfileData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Load saved tab state from localStorage or default to "tab1"
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("userProfileActiveTab") || "tab1";
  });

  // Function to handle tab changes and save the active tab to localStorage
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    localStorage.setItem("userProfileActiveTab", tabValue);
  };

  // Effect to save form data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userProfileData", JSON.stringify(formData));
  }, [formData]);

  // Effect to save active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userProfileActiveTab", activeTab);
  }, [activeTab]);

  const incrementTab = () => {
    const currentTabIndex = parseInt(activeTab.replace("tab", ""));
    if (currentTabIndex < 5) {
      handleTabChange(`tab${currentTabIndex + 1}`);
    }
  };

  const decrementTab = () => {
    const currentTabIndex = parseInt(activeTab.replace("tab", ""));
    if (currentTabIndex > 1) {
      // Prevents going below tab1
      handleTabChange(`tab${currentTabIndex - 1}`);
    }
  };

  return (
    <Tabs
      defaultValue="tab1"
      value={activeTab}
      onValueChange={handleTabChange}
      className="mt-6"
    >
      <TabsList className="w-full grid grid-cols-5 bg-card">
        <TabsTrigger value="tab1">1</TabsTrigger>
        <TabsTrigger value="tab2">2</TabsTrigger>
        <TabsTrigger value="tab3">3</TabsTrigger>
        <TabsTrigger value="tab4">4</TabsTrigger>
        <TabsTrigger value="tab5">5</TabsTrigger>
      </TabsList>
      <div className="mt-6">
        <TabsContent value="tab1">
          <Tab1 formData={formData} updateFormData={updateFormData} />
        </TabsContent>
        <TabsContent value="tab2">
          <Tab2 formData={formData} updateFormData={updateFormData} />
        </TabsContent>
        <TabsContent value="tab3">
          <Tab3 formData={formData} updateFormData={updateFormData} />
        </TabsContent>
        <TabsContent value="tab4">
          <Tab4 formData={formData} updateFormData={updateFormData} />
        </TabsContent>
        <TabsContent value="tab5">
          <Tab5 formData={formData} updateFormData={updateFormData} />
        </TabsContent>
      </div>
      <div className="flex justify-between mt-8">
        <Button className="px-4 py-2 " onClick={decrementTab}>
          <ChevronLeft />
        </Button>
        <Button className="px-4 py-2 " onClick={() => {}}>
          SAVE CHANGES
        </Button>
        <Button className="px-4 py-2 " onClick={incrementTab}>
          <ChevronRight />
        </Button>
      </div>
    </Tabs>
  );
};
