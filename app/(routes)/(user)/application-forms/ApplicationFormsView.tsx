"use client";

import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User } from "@clerk/backend";
import { ApplicantData } from "@/types/ApplicantData";

import { useApplications } from "@/hooks/use-applications";

import { Tab1 } from "./components/Tab1";
import { Tab2 } from "./components/Tab2";
import { Tab3 } from "./components/Tab3";
import { Tab4 } from "./components/Tab4";
import { Tab5 } from "./components/Tab5";
import { Tab6 } from "./components/Tab6";
import { Tab7 } from "./components/Tab7";
import { Tab8 } from "./components/Tab8";
import { Tab9 } from "./components/Tab9";

const initializeFormData = (applications?: ApplicantData, user?: User) => {
  const defaultData = {
    isQuestionReadAndUnderstood:
      applications?.isQuestionReadAndUnderstood || false,
    isPrivacyNoticeAccepted: applications?.isPrivacyNoticeAccepted || false,
    isWaiverAccepted: applications?.isWaiverAccepted || false,

    // SECTION 1: Personal Information
    // Personal
    applicantId: applications?.applicantId || user?.id,
    activeEmail:
      applications?.activeEmail || user?.primaryEmailAddress?.emailAddress,
    lastName: applications?.lastName || user?.lastName,
    firstName: applications?.firstName || user?.firstName,
    age: applications?.age || "",
    gender: applications?.gender || "Male",
    nationality: applications?.nationality || "Filipino",
    religion: applications?.religion || "",
    birthdate: applications?.birthdate || "",
    birthplace: applications?.birthplace || "",
    civilStatus: applications?.civilStatus || "Single",
    // Family
    birthRank: applications?.birthRank || "",
    numBrothers: applications?.numBrothers || "",
    numSisters: applications?.numSisters || "",
    numCITBrothersSisters: applications?.numCITBrothersSisters || "",
    // Address
    homeAddress: applications?.homeAddress || "",
    cityAddress: applications?.cityAddress || "",
    // Social
    facebookURL: applications?.facebookURL || "",
    mobileNumber: applications?.mobileNumber || "",

    // SECTION 2: Parents Profile & Emergency Contact
    // Father's Profile
    fatherName: applications?.fatherName || "",
    fatherAge: applications?.fatherAge || "",
    fatherBirthplace: applications?.fatherBirthplace || "",
    fatherNationality: applications?.fatherNationality || "Filipino",
    fatherReligion: applications?.fatherReligion || "",
    fatherEducation: applications?.fatherEducation || "High School",
    fatherOccupation: applications?.fatherOccupation || "",
    // Mother's Profile
    motherName: applications?.motherName || "",
    motherAge: applications?.motherAge || "",
    motherBirthplace: applications?.motherBirthplace || "",
    motherNationality: applications?.motherNationality || "Filipino",
    motherReligion: applications?.motherReligion || "",
    motherEducation: applications?.motherEducation || "High School",
    motherOccupation: applications?.motherOccupation || "",
    // Emergency Contact
    emergencyContactName: applications?.emergencyContactName || "",
    emergencyContactRelationship:
      applications?.emergencyContactRelationship || "",
    emergencyContactAddress: applications?.emergencyContactAddress || "",
    emergencyContactNumber: applications?.emergencyContactNumber || "",

    // SECTION 3: Educational Background
    educationalAttainment: applications?.educationalAttainment || "High School",
    // Previous Education
    prevCourse: applications?.prevCourse || "",
    lastSchool: applications?.lastSchool || "",
    schoolYear: applications?.schoolYear || "",
    schoolType: applications?.schoolType || "Public",
    prevSchoolAddress: applications?.prevSchoolAddress || "",
    // High School
    hsSchoolName: applications?.hsSchoolName || "",
    hsSchoolAddress: applications?.hsSchoolAddress || "",
    hsYearGraduated: applications?.hsYearGraduated || "",
    // Elementary
    elemSchoolName: applications?.elemSchoolName || "",
    elemSchoolAddress: applications?.elemSchoolAddress || "",
    elemYearGraduated: applications?.elemYearGraduated || "",

    // Program Choices
    progChoice1: applications?.progChoice1 || "",
    progChoice2: applications?.progChoice2 || "",
    progChoice3: applications?.progChoice3 || "",

    // SECTION 4: Requirement Documents
    applicantType: applications?.applicantType || "",
    // Pre-evaluation Requirements
    evalSheet: applications?.evalSheet || "",
    jobDescription: applications?.jobDescription || "",
    // Other Requirements
    tor: applications?.tor || "",
    hsForm137A: applications?.hsForm137A || "",
    hsForm138: applications?.hsForm138 || "",
    psaBirthCert: applications?.psaBirthCert || "",
    transferCred: applications?.transferCred || "",
    marriageCert: applications?.marriageCert || "",
    employmentCert: applications?.employmentCert || "",
    businessProof: applications?.businessProof || "",
    // Undertaking/Waiver
    missingDocs: applications?.missingDocs || "",
    photoWithValidId: applications?.photoWithValidId || "",

    // SECTION 5: Essay Admission Test
    examSet: applications?.examSet || "",
    // Answers
    firstQuestionAnswer: applications?.firstQuestionAnswer || "",
    secondQuestionAnswer: applications?.secondQuestionAnswer || "",
    thirdQuestionAnswer: applications?.thirdQuestionAnswer || "",
    fourthQuestionAnswer: applications?.fourthQuestionAnswer || "",
    fifthQuestionAnswer: applications?.fifthQuestionAnswer || "",
  };

  return { ...defaultData, ...applications };
};

interface ApplicationFormsViewProps {
  applications?: ApplicantData;
  canEdit: boolean;
  isSubmitted: boolean;
}

export const ApplicationFormsView = ({
  applications,
  canEdit,
  isSubmitted,
}: ApplicationFormsViewProps) => {
  const { user } = useUser();
  const { createApplication, updateApplication } = useApplications();
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ApplicantData>(() => {
    const savedFormData = localStorage.getItem("applicationFormData");
    if (savedFormData) {
      return JSON.parse(savedFormData);
    }
    return initializeFormData(applications, user as unknown as User);
  });

  // Helper to check if any required field is empty
  const areRequiredFieldsValid = () => {
    const requiredFields: Array<keyof ApplicantData> = [
      "isQuestionReadAndUnderstood",
      "isPrivacyNoticeAccepted",
      "isWaiverAccepted",

      // SECTION 1: Personal Information
      "applicantId",
      "activeEmail",
      "lastName",
      "firstName",
      "age",
      "gender",
      "nationality",
      "religion",
      "birthdate",
      "birthplace",
      "civilStatus",
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
      "educationalAttainment",
      "lastSchool",
      "schoolYear",
      "hsSchoolName",
      "hsSchoolAddress",
      "hsYearGraduated",
      "elemSchoolName",
      "elemSchoolAddress",
      "elemYearGraduated",

      // SECTION 4: Requirement Documents
      "applicantType",
      "evalSheet",
      "jobDescription",
      "photoWithValidId",

      // Program Choices
      "progChoice1",
      "progChoice2",
      "progChoice3",

      // SECTION 5: Essay Admission Test
      "examSet",
      "firstQuestionAnswer",
      "secondQuestionAnswer",
      "thirdQuestionAnswer",
      "fourthQuestionAnswer",
      "fifthQuestionAnswer",
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);

    return {
      isValid: emptyFields.length === 0,
      missingFields: emptyFields,
    };
  };

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

  // Effect to scroll to top on tab change
  useEffect(() => {
    if (contentRef.current) {
      const topOffset =
        contentRef.current.getBoundingClientRect().top + window.scrollY - 200; // n px offset
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, [activeTab]);

  // Handle form submission
  const handleSubmit = async () => {
    const { isValid, missingFields } = areRequiredFieldsValid();

    if (!isValid) {
      toast.error(
        `Please fill in the required fields: ${missingFields
          .map((field) => field)
          .join(", ")}`
      );
      return;
    }

    isSubmitted
      ? await updateApplication(formData.applicationId as string, formData)
      : await createApplication(formData);
  };

  return (
    <>
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
        {!canEdit && (
          <h2 className="text-sm text-red-600 italic text-center mt-4">
            To be able to edit your submitted application, please contact an
            ETEEAP in-charge first.
          </h2>
        )}
        <div ref={contentRef}>
          <TabsContent value="tab1">
            <Tab1
              formData={formData}
              updateFormData={updateFormData}
              canEdit={canEdit}
            />
          </TabsContent>
          <TabsContent value="tab2">
            <Tab2
              formData={formData}
              updateFormData={updateFormData}
              canEdit={canEdit}
            />
          </TabsContent>
          <TabsContent value="tab3">
            <Tab3
              formData={formData}
              updateFormData={updateFormData}
              canEdit={canEdit}
            />
          </TabsContent>
          <TabsContent value="tab4">
            <Tab4
              formData={formData}
              updateFormData={updateFormData}
              canEdit={canEdit}
            />
          </TabsContent>
          <TabsContent value="tab5">
            <Tab5
              formData={formData}
              updateFormData={updateFormData}
              canEdit={canEdit}
            />
          </TabsContent>
          <TabsContent value="tab6">
            <Tab6
              formData={formData}
              updateFormData={updateFormData}
              canEdit={canEdit}
            />
          </TabsContent>
          <TabsContent value="tab7">
            <Tab7
              formData={formData}
              updateFormData={updateFormData}
              canEdit={canEdit}
            />
          </TabsContent>
          <TabsContent value="tab8">
            <Tab8
              formData={formData}
              updateFormData={updateFormData}
              isSubmitted={isSubmitted}
            />
          </TabsContent>
          <TabsContent value="tab9">
            <Tab9 formData={formData} updateFormData={updateFormData} />
          </TabsContent>
        </div>
        <div className="flex justify-between mt-8">
          <Button
            disabled={activeTab === "tab1"}
            className="px-4 py-2 "
            onClick={decrementTab}
          >
            <ChevronLeft />
          </Button>
          {activeTab === "tab9" && (
            <Button
              disabled={!canEdit}
              className="px-4 py-2 "
              onClick={handleSubmit}
            >
              {isSubmitted ? "UPDATE" : "SUBMIT"}
            </Button>
          )}

          <Button
            disabled={activeTab === "tab9"}
            className="px-4 py-2 "
            onClick={incrementTab}
          >
            <ChevronRight />
          </Button>
        </div>
      </Tabs>
    </>
  );
};
