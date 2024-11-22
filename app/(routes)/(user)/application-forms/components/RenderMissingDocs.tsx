import React, { useEffect, useCallback } from "react";
import { ApplicantData } from "@/types/ApplicantData";

interface RenderMissingDocsProps {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
}

export const RenderMissingDocs = ({
  formData,
  updateFormData,
}: RenderMissingDocsProps) => {
  // Solution 1: Using useCallback
  const checkMissingDocuments = useCallback(() => {
    const missingDocs = [];

    // Check basic documents
    if (!formData.tor) {
      missingDocs.push("Informative Copy of the Transcript of Records (TOR)");
    }
    if (!formData.psaBirthCert) {
      missingDocs.push("PSA-Authenticated Birth Certificate");
    }
    if (!formData.transferCred) {
      missingDocs.push("Certificate of Transfer Credential");
    }
    if (!formData.employmentCert) {
      missingDocs.push("Certificate/s of Employment (COE)");
    }
    if (!formData.jobDescription) {
      missingDocs.push("Employer-Certified Detailed Job Description");
    }
    if (!formData.businessProof) {
      missingDocs.push("Evidence of Business Ownership");
    }

    // Check marriage certificate for women with specific civil status
    if (
      formData.gender === "Female" &&
      (formData.civilStatus === "Married" ||
        formData.civilStatus === "Divorced" ||
        formData.civilStatus === "Widowed/Widower") &&
      !formData.marriageCert
    ) {
      missingDocs.push("Marriage Certificate (for Women Only)");
    }

    // Check high school forms if educational attainment is High School
    if (formData.educationalAttainment === "High School") {
      if (!formData.hsForm137A) {
        missingDocs.push("HS Form 137-A");
      }
      if (!formData.hsForm138) {
        missingDocs.push("HS Form 138");
      }
    }

    return missingDocs;
  }, [
    formData.tor,
    formData.psaBirthCert,
    formData.transferCred,
    formData.employmentCert,
    formData.jobDescription,
    formData.businessProof,
    formData.marriageCert,
    formData.gender,
    formData.civilStatus,
    formData.educationalAttainment,
    formData.hsForm137A,
    formData.hsForm138,
  ]);

  useEffect(() => {
    const missingDocs = checkMissingDocuments();
    updateFormData({ missingDocs });
  }, [checkMissingDocuments, updateFormData]);

  const allDocuments = [
    "Informative Copy of the Transcript of Records (TOR)",
    "PSA-Authenticated Birth Certificate",
    "Certificate of Transfer Credential",
    "Marriage Certificate (for Women Only)",
    "Certificate/s of Employment (COE)",
    "Employer-Certified Detailed Job Description",
    "Evidence of Business Ownership",
    "HS Form 137-A",
    "HS Form 138",
  ];

  const shouldShowDocument = useCallback(
    (doc: string) => {
      if (doc === "Marriage Certificate (for Women Only)") {
        return (
          formData.gender === "Female" &&
          (formData.civilStatus === "Married" ||
            formData.civilStatus === "Divorced" ||
            formData.civilStatus === "Widowed/Widower")
        );
      }
      if (doc === "HS Form 137-A" || doc === "HS Form 138") {
        return formData.educationalAttainment === "High School";
      }
      return true;
    },
    [formData.gender, formData.civilStatus, formData.educationalAttainment]
  );

  return (
    <div className="space-y-2">
      {allDocuments.map((doc, index) =>
        shouldShowDocument(doc) ? (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="radio"
              id={`doc-${index}`}
              name={`doc-${index}`}
              checked={formData.missingDocs?.includes(doc)}
              readOnly
              className="cursor-not-allowed"
            />
            <label htmlFor={`doc-${index}`} className="text-sm">
              {doc}
            </label>
          </div>
        ) : null
      )}
    </div>
  );
};
