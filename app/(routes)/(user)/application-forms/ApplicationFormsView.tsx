"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Tab1 } from "./components/Tab1";
import { Tab2 } from "./components/Tab2";
import { Tab3 } from "./components/Tab3";
import { Tab4 } from "./components/Tab4";
import { Tab5 } from "./components/Tab5";
import { Tab6 } from "./components/Tab6";
import { Tab7 } from "./components/Tab7";
import { Tab8 } from "./components/Tab8";

export const ApplicationFormsView = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("applicationFormData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          isQuestionReadAndUnderstood: false,
          // TAB 1: General Information
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

          // TAB 2: Family Background
          fatherName: "",
          fatherAge: "",
          fatherBirthplace: "",
          fatherNationality: "",
          fatherReligion: "",
          fatherEducation: "",
          fatherOccupation: "",

          motherName: "",
          motherAge: "",
          motherBirthplace: "",
          motherNationality: "",
          motherReligion: "",
          motherEducation: "",
          motherOccupation: "",

          // TAB 3: Educational Background
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

          // TAB 4: Requirement Documents
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
          applicantType: "",
          missingDocs: "",
          isWaiverAccepted: false,
          photoWithID: "",

          // TAB 5: Emergency Contact & Essay Admission Test
          // Emergency Contact
          contactName: "",
          relation: "",
          contactAddress: "",
          contactNumber: "",
          // Essay Admission Test
          examSet: "",
          // Questions
          firstQuestion: "",
          secondQuestion: "",
          thirdQuestion: "",
          fourthQuestion: "",
          fifthQuestion: "",
        };
  });

  // Function to update form data and save to localStorage
  const updateFormData = (newData: any) => {
    setFormData((prevData: any) => {
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

  return (
    <Tabs
      defaultValue="tab1"
      value={activeTab}
      onValueChange={handleTabChange}
      className="mt-6"
    >
      <TabsList className="w-full grid grid-cols-8">
        <TabsTrigger value="tab1">1</TabsTrigger>
        <TabsTrigger value="tab2">2</TabsTrigger>
        <TabsTrigger value="tab3">3</TabsTrigger>
        <TabsTrigger value="tab4">4</TabsTrigger>
        <TabsTrigger value="tab5">5</TabsTrigger>
        <TabsTrigger value="tab6">6</TabsTrigger>
        <TabsTrigger value="tab7">7</TabsTrigger>
        <TabsTrigger value="tab8">8</TabsTrigger>
      </TabsList>
      <div className="mt-6">
        <TabsContent value="tab1">
          <Tab1
            formData={formData}
            updateFormData={updateFormData}
            handleTabChange={handleTabChange}
          />
        </TabsContent>
        <TabsContent value="tab2">
          {/* <Tab2 formData={formData} updateFormData={updateFormData} /> */}
        </TabsContent>
        <TabsContent value="tab3">
          {/* <Tab3 formData={formData} updateFormData={updateFormData} /> */}
        </TabsContent>
        <TabsContent value="tab4">
          {/* <Tab4 formData={formData} updateFormData={updateFormData} /> */}
        </TabsContent>
        <TabsContent value="tab5">
          {/* <Tab5 formData={formData} updateFormData={updateFormData} /> */}
        </TabsContent>
        <TabsContent value="tab6">
          {/* <Tab6 formData={formData} updateFormData={updateFormData} /> */}
        </TabsContent>
        <TabsContent value="tab7">
          {/* <Tab7 formData={formData} updateFormData={updateFormData} /> */}
        </TabsContent>
        <TabsContent value="tab8">
          {/* <Tab8 formData={formData} updateFormData={updateFormData} /> */}
        </TabsContent>
      </div>
    </Tabs>
  );
};
