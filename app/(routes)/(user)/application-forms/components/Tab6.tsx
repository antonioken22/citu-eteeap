import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ApplicantData } from "@/types/ApplicantData";
import { useFileUpload } from "@/hooks/use-file-upload";

interface Tab6Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
}

const documentFields = [
  { key: "tor", label: "Transcript of Records" },
  { key: "hsForm", label: "HS Form 137/138" },
  { key: "psaBirthCert", label: "PSA Birth Certificate" },
  { key: "transferCred", label: "Transfer Credentials" },
  { key: "marriageCert", label: "Marriage Certificate" },
  { key: "employmentCert", label: "Employment Certificate" },
  { key: "businessProof", label: "Proof of Business" },
];

export const Tab6 = ({ formData, updateFormData }: Tab6Props) => {
  const { setSelectedFileUpload, uploadPhoto, fileUrls } = useFileUpload();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleMissingDocsChange = (field: string) => {
    const updatedMissingDocs = formData.missingDocs.includes(field)
      ? formData.missingDocs.filter((item) => item !== field)
      : [...formData.missingDocs, field];

    updateFormData({ missingDocs: updatedMissingDocs });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Requirement Documents</h2>

      {/* Applicant Type */}
      <label className="block">
        <span className="font-medium">Applicant Type:</span>
        <div className="flex flex-col mt-1">
          {["ETEEAP"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="applicantType"
                required
                value={option}
                checked={formData.applicantType === option}
                onChange={handleInputChange}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      </label>

      {/* Pre-evaluation Requirements */}
      <h3 className="text-md font-semibold text-center">
        Pre-evaluation Requirements
      </h3>
      {/* Evaluation Sheet */}
      <div>
        <h4 className="font-medium">Attach Evaluation Sheet:</h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="evalSheet"
            disabled
            required
            placeholder="Evaluation Sheet URL will appear here after upload."
            value={formData.evalSheet || fileUrls.evalSheet || ""}
            onChange={handleInputChange}
            className="w-full mt-1"
          />
          <Input
            type="file"
            accept=".pdf, .docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.size <= 10 * 1024 * 1024) {
                setSelectedFileUpload(file);
              } else {
                toast.error("File is too large. Max size is 10MB.");
              }
            }}
          />
          <Button
            type="button"
            onClick={() => uploadPhoto("eval-sheets", "evalSheet")}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* Other Requirements */}
      <h3 className="text-md font-semibold text-center">Other Requirements</h3>
      {documentFields.map(({ key, label }) => (
        <div key={key}>
          <h4 className="font-medium">Attach {label}:</h4>
          <div className="flex items-center justify-between space-x-2">
            <Input
              type="text"
              name={key}
              disabled
              placeholder={`${label} URL will appear here after upload.`}
              value={
                (formData[key as keyof ApplicantData] as string) ||
                fileUrls[key] ||
                ""
              }
              onChange={handleInputChange}
              className="w-full mt-1"
            />
            <Input
              type="file"
              accept=".pdf, .docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size <= 10 * 1024 * 1024) {
                  setSelectedFileUpload(file);
                } else {
                  toast.error("File is too large. Max size is 10MB.");
                }
              }}
              disabled={
                key === "marriageCert" &&
                !(
                  formData.gender === "Female" &&
                  ["Married", "Divorced", "Widowed/Widower"].includes(
                    formData.civilStatus
                  )
                )
              }
            />
            <Button
              type="button"
              onClick={() =>
                uploadPhoto(key.replace(/([A-Z])/g, "-$1").toLowerCase(), key)
              }
            >
              Upload
            </Button>
          </div>
          <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
        </div>
      ))}

      {/* Missing Docs - Checkbox Group */}
      <h3 className="text-md font-semibold text-center">Undertaking/Waiver</h3>
      <div className="flex flex-col mt-1">
        {documentFields.map(({ key, label }) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              name="missingDocs"
              value={key}
              checked={formData.missingDocs.includes(key)}
              onChange={() => handleMissingDocsChange(key)}
              disabled={!!fileUrls[key]}
            />
            <span className="ml-2">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
