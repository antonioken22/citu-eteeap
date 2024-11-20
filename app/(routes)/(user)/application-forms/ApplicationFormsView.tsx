"use client";

import { useUser } from "@clerk/nextjs";
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
import { Tab6 } from "./components/Tab6";
import { Tab7 } from "./components/Tab7";
import { Tab8 } from "./components/Tab8";
import { Tab9 } from "./components/Tab9";

export const ApplicationFormsView = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState<ApplicantData>(() => {
    const savedFormData = localStorage.getItem("applicationFormData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          isQuestionReadAndUnderstood: false,
          isPrivacyNoticeAccepted: false,
          isWaiverAccepted: false,

          // SECTION 1: Personal Information
          // Personal
          applicantId: user?.id,
          activeEmail: user?.primaryEmailAddress?.emailAddress,
          lastName: user?.lastName,
          firstName: user?.firstName,
          age: "",
          gender: "",
          nationality: "Filipino",
          religion: "",
          birthdate: "",
          birthplace: "",
          civilStatus: "",
          // Family
          birthRank: "",
          numBrothers: "",
          numSisters: "",
          numCITBrothersSisters: "",
          // Address
          homeAddress: "",
          cityAddress: "",
          // Social
          facebookURL: "",
          mobileNumber: "",

          // SECTION 2: Parents Profile & Emergency Contact
          // Father's Profile
          fatherName: "",
          fatherAge: "",
          fatherBirthplace: "",
          fatherNationality: "",
          fatherReligion: "",
          fatherEducation: "",
          fatherOccupation: "",
          // Mother's Profile
          motherName: "",
          motherAge: "",
          motherBirthplace: "",
          motherNationality: "",
          motherReligion: "",
          motherEducation: "",
          motherOccupation: "",
          // Emergency Contact
          emergencyContactName: "",
          emergencyContactRelationship: "",
          emergencyContactAddress: "",
          emergencyContactNumber: "",

          // SECTION 3: Educational Background
          educationalAttainment: "",
          // Previous Education
          prevCourse: "",
          lastSchool: "",
          schoolYear: "",
          schoolType: "",
          prevSchoolAddress: "",
          // High School
          hsSchoolName: "",
          hsSchoolAddress: "",
          hsYearGraduated: "",
          // Elementary
          elemSchoolName: "",
          elemSchoolAddress: "",
          elemYearGraduated: "",

          // Program Choices
          progChoice1: "",
          progChoice2: "",
          progChoice3: "",

          // SECTION 4: Requirement Documents
          applicantType: "",
          // Pre-evaluation Requirements
          evalSheet: "",
          jobDescription: "",
          // Other Requirements
          tor: "",
          hsForm: "",
          psaBirthCert: "",
          transferCred: "",
          marriageCert: "",
          employmentCert: "",
          businessProof: "",
          // Undertaking/Waiver
          missingDocs: "",
          photoWithID: "",

          // SECTION 5: Essay Admission Test
          examSet: "",
          // Answers
          firstQuestionAnswer: "",
          secondQuestionAnswer: "",
          thirdQuestionAnswer: "",
          fourthQuestionAnswer: "",
          fifthQuestionAnswer: "",
        };
  });

  // Function to update form data and save to localStorage
  const updateFormData = (newData: Partial<ApplicantData>) => {
    setFormData((prevData: ApplicantData) => {
      const updatedData = { ...prevData, ...newData };
      localStorage.setItem("applicationFormData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Load saved tab state from localStorage or default to "tab1"
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "tab1";
  });

  // Function to handle tab changes and save the active tab to localStorage
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    localStorage.setItem("activeTab", tabValue);
  };

  // Effect to save form data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
  }, [formData]);

  // Effect to save active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const incrementTab = () => {
    const currentTabIndex = parseInt(activeTab.replace("tab", ""));
    if (currentTabIndex < 9) {
      // Assuming there are 8 tabs
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
      <TabsList className="w-full grid grid-cols-9">
        <TabsTrigger value="tab1">1</TabsTrigger>
        <TabsTrigger value="tab2">2</TabsTrigger>
        <TabsTrigger value="tab3">3</TabsTrigger>
        <TabsTrigger value="tab4">4</TabsTrigger>
        <TabsTrigger value="tab5">5</TabsTrigger>
        <TabsTrigger value="tab6">6</TabsTrigger>
        <TabsTrigger value="tab7">7</TabsTrigger>
        <TabsTrigger value="tab8">8</TabsTrigger>
        <TabsTrigger value="tab9">9</TabsTrigger>
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
        <TabsContent value="tab6">
          <Tab6 formData={formData} updateFormData={updateFormData} />
        </TabsContent>
        <TabsContent value="tab7">
          <Tab7 formData={formData} updateFormData={updateFormData} />
        </TabsContent>
        <TabsContent value="tab8">
          <Tab8 formData={formData} updateFormData={updateFormData} />
        </TabsContent>
        <TabsContent value="tab9">
          <Tab9 formData={formData} updateFormData={updateFormData} />
        </TabsContent>
      </div>
      <div className="flex justify-between mt-8">
        <Button className="px-4 py-2 " onClick={decrementTab}>
          <ChevronLeft />
        </Button>
        <Button className="px-4 py-2 " onClick={incrementTab}>
          <ChevronRight />
        </Button>
      </div>
    </Tabs>
  );
};
