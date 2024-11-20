import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ApplicantData } from "@/types/ApplicantData";
import { useFileUpload } from "@/hooks/use-file-upload";

interface Tab6Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
}

export const Tab6 = ({ formData, updateFormData }: Tab6Props) => {
  const { setSelectedFileUpload, uploadPhoto, fileUrls } = useFileUpload();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
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
            placeholder="Your Evaluation Sheet URL will appear here after upload."
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

      {/* Job Description */}
      <div>
        <h4 className="font-medium">
          Attach Employer-Certified Detailed Job Description:
        </h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="jobDescription"
            disabled
            required
            placeholder="Your Employer-Certified Detailed Job Description URL will appear here after upload."
            value={formData.jobDescription || fileUrls.jobDescription || ""}
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
            onClick={() => uploadPhoto("job-desc", "jobDescription")}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* Other Requirements */}
      <h3 className="text-md font-semibold text-center">Other Requirements</h3>
      <p className="text-sm text-muted-foreground">
        Kindly upload the documents required. However, if the documents are not
        present or cannot be secured at the moment, you may submit them on a
        later time once normalcy is restored.
      </p>

      {/* TOR */}
      <div>
        <h4 className="font-medium">
          Informative Copy of the Transcript of Records (TOR):
        </h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="tor"
            disabled
            placeholder="Your TOR URL will appear here after upload."
            value={formData.tor || fileUrls.tor || ""}
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
          <Button type="button" onClick={() => uploadPhoto("tor", "tor")}>
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* HS Form 137/138 */}
      <div>
        <h4 className="font-medium">
          Attach Form 137/Form 138 (High School Graduate Only):
        </h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="hsForm"
            disabled
            placeholder="Your HS Form 137/Form138 URL will appear here after upload."
            value={formData.hsForm || fileUrls.hsForm || ""}
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
            onClick={() => uploadPhoto("hs-form-137-138", "hsForm")}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* PSA Birth Certificate */}
      <div>
        <h4 className="font-medium">PSA-Authenticated Birth Certificate:</h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="psaBirthCert"
            disabled
            placeholder="Your PSA-Authenticated Birth Certificate URL will appear here after upload."
            value={formData.psaBirthCert || fileUrls.psaBirthCert || ""}
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
            onClick={() => uploadPhoto("psa-birth-cert", "psaBirthCert")}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* Transfer Credential */}
      <div>
        <h4 className="font-medium">Certificate of Transfer Credential:</h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="transferCred"
            disabled
            placeholder="Your Certificate of Transfer Credential will appear here after upload."
            value={formData.transferCred || fileUrls.transferCred || ""}
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
            onClick={() => uploadPhoto("transfer-cred", "transferCred")}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* Marriage Certificate */}
      <div>
        <h4 className="font-medium">
          Marriage Certificate (Form Married Women Only):
        </h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="marriageCert"
            disabled
            placeholder="Your Marriage Certificate URL will appear here after upload."
            value={formData.marriageCert || fileUrls.marriageCert || ""}
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
            onClick={() => uploadPhoto("marriage-cert", "marriageCert")}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* Certificate of Employment (COE) */}
      <div>
        <h4 className="font-medium">Certificate of Employment (COE):</h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="employmentCert"
            disabled
            placeholder="Your Certificate of Employment (COE) URL will appear here after upload."
            value={formData.employmentCert || fileUrls.employmentCert || ""}
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
            onClick={() => uploadPhoto("employment-cert", "employmentCert")}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* Evidence of Business Ownership */}
      <div>
        <h4 className="font-medium">
          Evidence of Business Ownership (For Self-Employed Only):
        </h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="businessProof"
            disabled
            placeholder="Your Evidence of Business Ownership URL will appear here after upload."
            value={formData.businessProof || fileUrls.businessProof || ""}
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
            onClick={() => uploadPhoto("business-proof", "businessProof")}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>
    </div>
  );
};
