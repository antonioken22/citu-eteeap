import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ProgramsOffered from "@/public/application-forms/programs-offered.png";

export const Tab2 = ({ formData, updateFormData, handleTabChange }: any) => {
  return (
    <div className="p-6 space-y-6 rounded-lg shadow-md">
      {/* Welcome Message */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-center">
          Welcome to CIT UNIVERSITY&apos;s ETEEAP ADMISSION PORTAL!
        </h2>
        <p>
          Before you fill out this form, please DOWNLOAD and ACCOMPLISH the
          following using MICROSOFT WORD:
          <ul className="list-disc pl-6 space-y-1">
            <li>
              {" "}
              Applicant&apos;s Evaluation Sheet (
              <a
                href="http://bit.ly/ETEEAP-ApplicantEvaluationForm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-1"
              >
                http://bit.ly/ETEEAP-ApplicantEvaluationForm
              </a>{" "}
              )
            </li>
          </ul>
        </p>

        <p>Also, please secure electronic copies of the following documents:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Informative Copy of the Transcript of Records (TOR)</li>
          <li>PSA-Authenticated Birth Certificate</li>
          <li>Certificate of Transfer Credential</li>
          <li>Marriage Certificate (For Women Only)</li>
          <li>Certificate/s of Employment (COE)</li>
          <li>Employer-Certified Detailed Job Description</li>
          <li>Evidence of Business Ownership</li>
        </ul>

        <p>PLEASE ACCOMPLISH ALL SECTIONS OF THIS FORM.</p>
        <p>
          Also, as a requirement, we will need a picture of you showing the
          front side of your valid ID. Kindly take the picture before you begin.
        </p>
      </div>

      {/* Programs Covered Image Placeholder */}
      <div className="bg-muted p-4 rounded-lg flex flex-col items-center space-y-2">
        <p className="text-lg font-semibold">Programs Covered</p>
        <Image
          src={ProgramsOffered}
          alt="Programs Covered"
          width={1681}
          height={787}
          placeholder="blur"
          loading="eager"
          className="w-full h-auto"
        />
      </div>

      {/* Privacy Notice */}
      <div className="bg-yellow-200 p-4 rounded-lg">
        <p className="text-sm text-gray-800">
          By accomplishing this form, your personal information will be
          collected which includes but not limited to your name, address, names
          and addresses of your parents or guardians, date of birth, grades,
          attendance, contact numbers and other information necessary collected
          pursuant to your enrollment to CIT University. This personal
          information will solely be used for purposes of my CIT University
          admission. The information you provided in this form will be used
          within CIT University and will not be shared with any outside parties
          unless there is prior written consent from you. CIT University
          respects your rights as data subject under the Data Privacy Act. If
          you have further questions and concerns regarding the processing of
          your personal information you are welcome to contact our Data
          Protection Officer via{" "}
          <a href="mailto:dpo@cit.edu" className="text-blue-600 underline">
            dpo@cit.edu
          </a>
          .
        </p>
      </div>

      <p>
        I hereby affirm that I have read and understood the terms presented in
        the foregoing Privacy Notice. Thus, by ticking the &quot;I ACCEPT&quot;
        box I hereby give my consent for the processing and retention of my
        personal information collected through this form.
      </p>

      {/* Checkbox for agreement */}
      <label className="flex items-center mt-4 font-semibold">
        <Input
          type="checkbox"
          name="isPrivacyNoticeAccepted"
          required
          checked={formData.isPrivacyNoticeAccepted}
          onChange={(e) =>
            updateFormData({ isPrivacyNoticeAccepted: e.target.checked })
          }
          className="w-4 h-4 mr-2"
        />
        <span>I ACCEPT</span>
      </label>

      {/* Previous and Next buttons */}
      <div className="flex justify-between mt-8">
        <Button className="px-4 py-2 " onClick={() => handleTabChange("tab1")}>
          Previous
        </Button>
        <Button className="px-4 py-2 " onClick={() => handleTabChange("tab3")}>
          Next
        </Button>
      </div>
    </div>
  );
};
