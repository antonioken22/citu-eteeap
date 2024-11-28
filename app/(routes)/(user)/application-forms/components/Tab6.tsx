import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ApplicantData } from "@/types/ApplicantData";
import { useFileUpload } from "@/hooks/use-file-upload";

interface Tab6Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
  canEdit: boolean;
}

export const Tab6 = ({ formData, updateFormData, canEdit }: Tab6Props) => {
  const { setSelectedFileUpload, uploadPhoto } = useFileUpload();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Requirement Documents</h2>

      {/* Applicant Type */}
      <label className="block">
        <span className="font-medium">Applicant Type*:</span>
        <div className="flex flex-col mt-1">
          {["ETEEAP"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                disabled={!canEdit}
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
        <h4 className="font-medium">Attach Evaluation Sheet*:</h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="evalSheet"
            disabled
            required
            placeholder="Your File URL will appear here after upload."
            value={formData.evalSheet as string}
            onChange={handleInputChange}
            className="w-full mt-1"
          />
          <Input
            type="file"
            disabled={!canEdit}
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
            disabled={!canEdit}
            onClick={async () => {
              updateFormData({
                evalSheet: await uploadPhoto("eval-sheets", "evalSheet"),
              });
            }}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* Job Description */}
      <div>
        <h4 className="font-medium">
          Attach Employer-Certified Detailed Job Description*:
        </h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="jobDescription"
            disabled
            required
            placeholder="Your File URL will appear here after upload."
            value={formData.jobDescription as string}
            onChange={handleInputChange}
            className="w-full mt-1"
          />
          <Input
            type="file"
            disabled={!canEdit}
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
            disabled={!canEdit}
            onClick={async () => {
              updateFormData({
                jobDescription: await uploadPhoto("job-desc", "jobDescription"),
              });
            }}
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
            placeholder="Your File URL will appear here after upload."
            value={formData.tor as string}
            className="w-full mt-1"
          />
          <Input
            type="file"
            disabled={!canEdit}
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
            disabled={!canEdit}
            onClick={async () => {
              updateFormData({ tor: await uploadPhoto("tor", "tor") });
            }}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* HS Forms */}
      {formData.educationalAttainment === "High School" && (
        <>
          {/* HS Form 137A*/}
          <div>
            <h4 className="font-medium">
              Attach Form 137-A (High School Graduate Only):
            </h4>
            <div className="flex items-center justify-between space-x-2">
              <Input
                type="text"
                name="hsForm137A"
                disabled
                placeholder="Your File URL will appear here after upload."
                value={formData.hsForm137A as string}
                onChange={handleInputChange}
                className="w-full mt-1"
              />
              <Input
                type="file"
                disabled={!canEdit}
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
                disabled={!canEdit}
                onClick={async () => {
                  updateFormData({
                    hsForm137A: await uploadPhoto("hs-form-137a", "hsForm137A"),
                  });
                }}
              >
                Upload
              </Button>
            </div>
            <p className="p-1 text-xs text-muted-foreground">
              Max size is 10MB.
            </p>
          </div>

          {/* HS Form 138*/}
          <div>
            <h4 className="font-medium">
              Attach Form 138 (High School Graduate Only):
            </h4>
            <div className="flex items-center justify-between space-x-2">
              <Input
                type="text"
                name="hsForm138"
                disabled
                placeholder="Your File URL will appear here after upload."
                value={formData.hsForm138 as string}
                onChange={handleInputChange}
                className="w-full mt-1"
              />
              <Input
                type="file"
                disabled={!canEdit}
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
                disabled={!canEdit}
                onClick={async () => {
                  updateFormData({
                    hsForm138: await uploadPhoto("hs-form-138", "hsForm138"),
                  });
                }}
              >
                Upload
              </Button>
            </div>
            <p className="p-1 text-xs text-muted-foreground">
              Max size is 10MB.
            </p>
          </div>
        </>
      )}

      {/* PSA Birth Certificate */}
      <div>
        <h4 className="font-medium">PSA-Authenticated Birth Certificate:</h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="psaBirthCert"
            disabled
            placeholder="Your File URL will appear here after upload."
            value={formData.psaBirthCert as string}
            onChange={handleInputChange}
            className="w-full mt-1"
          />
          <Input
            type="file"
            disabled={!canEdit}
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
            disabled={!canEdit}
            onClick={async () => {
              updateFormData({
                psaBirthCert: await uploadPhoto(
                  "psa-birth-cert",
                  "psaBirthCert"
                ),
              });
            }}
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
            placeholder="Your File URL will appear here after upload."
            value={formData.transferCred as string}
            onChange={handleInputChange}
            className="w-full mt-1"
          />
          <Input
            type="file"
            disabled={!canEdit}
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
            disabled={!canEdit}
            onClick={async () => {
              updateFormData({
                transferCred: await uploadPhoto(
                  "transfer-cred",
                  "transferCred"
                ),
              });
            }}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>

      {/* Marriage Certificate */}
      {formData.gender === "Female" &&
        (formData.civilStatus === "Married" ||
          formData.civilStatus === "Divorced" ||
          formData.civilStatus === "Widowed/Widower") && (
          <div>
            <h4 className="font-medium">
              Marriage Certificate (Form Married Women Only):
            </h4>
            <div className="flex items-center justify-between space-x-2">
              <Input
                type="text"
                name="marriageCert"
                disabled
                placeholder="Your File URL will appear here after upload."
                value={formData.marriageCert as string}
                onChange={handleInputChange}
                className="w-full mt-1"
              />
              <Input
                type="file"
                disabled={!canEdit}
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
                disabled={!canEdit}
                onClick={async () => {
                  updateFormData({
                    marriageCert: await uploadPhoto(
                      "marriage-cert",
                      "marriageCert"
                    ),
                  });
                }}
              >
                Upload
              </Button>
            </div>
            <p className="p-1 text-xs text-muted-foreground">
              Max size is 10MB.
            </p>
          </div>
        )}

      {/* Certificate of Employment (COE) */}
      <div>
        <h4 className="font-medium">Certificate of Employment (COE):</h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="employmentCert"
            disabled
            placeholder="Your File URL will appear here after upload."
            value={formData.employmentCert as string}
            onChange={handleInputChange}
            className="w-full mt-1"
          />
          <Input
            type="file"
            disabled={!canEdit}
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
            disabled={!canEdit}
            onClick={async () => {
              updateFormData({
                employmentCert: await uploadPhoto(
                  "employment-cert",
                  "employmentCert"
                ),
              });
            }}
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
            placeholder="Your File URL will appear here after upload."
            value={formData.businessProof as string}
            onChange={handleInputChange}
            className="w-full mt-1"
          />
          <Input
            type="file"
            disabled={!canEdit}
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
            disabled={!canEdit}
            onClick={async () => {
              updateFormData({
                businessProof: await uploadPhoto(
                  "business-proof",
                  "businessProof"
                ),
              });
            }}
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>
    </div>
  );
};
