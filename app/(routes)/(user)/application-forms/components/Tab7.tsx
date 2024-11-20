import Image from "next/image";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useFileUpload } from "@/hooks/use-file-upload";
import { ApplicantData } from "@/types/ApplicantData";

import { RenderMissingDocs } from "./RenderMissingDocs";

import PhotoWithValidID from "@/public/application-forms/photo-with-valid-id-sample.png";

interface Tab7Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
}

export const Tab7 = ({ formData, updateFormData }: Tab7Props) => {
  const { setSelectedFileUpload, uploadPhoto, fileUrls } = useFileUpload();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Undertaking/Waiver</h2>
      <p>
        1. As an ETEEAP applicant, I am required by Cebu Institute of Technology
        University to furnish specific documents as part of the
        University&apos;s admission requirements for the program.
      </p>
      <p>
        2. However, in view of the existing Enhanced/General Community
        Quarantine implemented in some areas in the Philippines whereby closure
        of some establishments and movement restrictions are being imposed, I am
        unable to secure copies of the following documents:
      </p>
      <RenderMissingDocs formData={formData} updateFormData={updateFormData} />
      <p>
        3. In view thereof, I undertake to submit the above checked document/s
        within thirty (30) calendar days after the lifting of the
        Enhanced/General Community Quarantine or once the operations of the
        concerned offices/agencies would permit them to transact the issuance of
        the subject documents;
      </p>
      <p>
        4. I understand that I can neither be cleared for graduation, nor my
        diploma, Transcript of Record and other relevant school records be
        released, unless I submit the said required documents;
      </p>
      <p>
        5. I understand that absent the required documents, the University will
        rely on the information which I have declared in the admission and other
        official University forms pursuant to my program application. Any
        material misrepresentation, falsehood or misleading information made
        therein shall warrant cancellation of my enrolment and waiver in favor
        of the University of the fees that I have already tendered, in whole or
        in part, at the discretion of the University;
      </p>
      <p>
        6. I also understand that the commission of any misrepresentation and
        falsehood mentioned in the immediately preceding paragraph shall
        constitute as ground for the University to refuse in the future my
        admission to any program offered by the University;
      </p>
      <p>
        7. I understand that with the acceptance of my admission and enrollment
        application, I give my unconditional consent to the University and its
        agents for the use of my photographs and any or all personal information
        I have provided to the University in connection with the application for
        any legitimate purpose such as, but not limited to, research and data
        analysis, publication, government and trade reports, University
        accreditation, graduation programs, job recruitment database, employment
        and my career development;
      </p>
      <p>
        8. I have read and fully understand the above statements, and that by
        ticking the “I ACCEPT” button, I am signing this Undertaking/Waiver
        electronically. I agree that my electronic signature is the legal
        equivalent of manual signature on this Undertaking/Waiver.
      </p>

      {/* Checkbox for agreement */}
      <label className="flex items-center mt-4 font-semibold">
        <Input
          type="checkbox"
          name="isWaiverAccepted"
          required
          checked={formData.isWaiverAccepted}
          onChange={(e) =>
            updateFormData({ isWaiverAccepted: e.target.checked })
          }
          className="w-4 h-4 mr-2"
        />
        <span>I ACCEPT.*</span>
      </label>

      <div className="text-red-600 font-semibold">IMPORTANT:</div>
      <p className="text-justify">
        This UNDERTAKING/WAIVER shall not be considered submitted unless the
        submission is accompanied with the applicant&apos;s picture and COMPANY
        or GOVERNMENT-ISSUED ID.
      </p>

      {/* Programs Covered Image Placeholder */}
      <div className="bg-muted p-4 rounded-lg flex flex-col items-center space-y-2">
        <p className="text-lg font-semibold">
          Photo With Your Valid ID{" "}
          <span className="text-muted-foreground">
            or any proof of identity bearing your name
          </span>
        </p>
        <p className="text-sm text-justify">
          Please upload a picture of yourself showing valid ID. Make sure that
          your actual entire face, and ID can be clearly seen.
        </p>
        <Image
          alt="Photo With Your Valid ID Sample"
          src={PhotoWithValidID}
          width={408}
          height={540}
          placeholder="blur"
          loading="eager"
          className="w-[50vw] md:w-[30vw] h-auto p-2"
        />
      </div>

      {/* Photo With Valid ID */}
      <div>
        <h4 className="font-medium">Attach Your Photo With Your Valid Id*:</h4>
        <div className="flex items-center justify-between space-x-2">
          <Input
            type="text"
            name="photoWithValidId"
            disabled
            required
            placeholder="Your File URL will appear here after upload."
            value={formData.photoWithValidId || fileUrls.photoWithValidId || ""}
            onChange={handleInputChange}
            className="w-full mt-1"
          />
          <Input
            type="file"
            accept=".png, .jpg, .jpeg"
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
            onClick={() =>
              uploadPhoto("photo-with-valid-id", "photoWithValidId")
            }
          >
            Upload
          </Button>
        </div>
        <p className="p-1 text-xs text-muted-foreground">Max size is 10MB.</p>
      </div>
    </div>
  );
};
