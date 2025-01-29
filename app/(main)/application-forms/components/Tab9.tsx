"use client";

import Image from "next/image";

import { ApplicantData } from "@/types/ApplicantData";

import ETEEAPRequirements from "@/public/application-forms/eteeap-requirements.jpg";

type Tab9Props = {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
};

export const Tab9 = ({ formData, updateFormData }: Tab9Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">
        Other Instructions (Screenshot and save the instructions below)
      </h2>
      <p className="text-justify">
        🔴 CLICK &quot;SUBMIT&quot; TO SEND RESPONSES.
      </p>
      <p className="text-justify">
        1. Wait for a CONFIRMATION EMAIL from{" "}
        <a href="eteeap@cit.edu" className="text-blue-600 underline">
          eteeap@cit.edu
        </a>
        . Make sure that you have inputted the correct email address and mobile
        number. <br /> 2. Once your application is confirmed, you may proceed to
        paying the P5,350 (for local) or P8,350 (for OFW) Enrollment Deposit.
        See payment options available ({" "}
        <a
          href="www.bit.ly/citpaymentoptions"
          target="_blank"
          className="text-blue-600 underline"
        >
          www.bit.ly/citpaymentoptions
        </a>{" "}
        ). <br /> 3. <span className="font-bold">Important:</span> The
        Enrollment Deposit covers the administrative costs of admission, initial
        evaluation and enrollment, and once tendered, shall be non-refundable in
        case of Withdrawal or Transfer to another institution. Upon successful
        completion of ETEEAP, this amount shall be deducted from the Final Total
        Fees Assessment.
      </p>
      <p className="text-justify">
        🔴 CLICK &quot;SUBMIT&quot; TO SEND RESPONSES.
      </p>

      {/* Requirements Image Placeholder */}
      <div className="bg-muted p-4 rounded-lg flex flex-col items-center space-y-2">
        <p className="text-lg font-semibold">Requirements</p>
        <Image
          src={ETEEAPRequirements}
          alt="ETEEAP Requirements"
          width={1920}
          height={1080}
          placeholder="blur"
          loading="eager"
          className="w-full h-auto"
        />
      </div>
      <p className="text-justify">
        Thank you for choosing to be a TECHNOLOGIAN! <br />
        🔴 CLICK &quot;SUBMIT&quot; TO SEND RESPONSES.
      </p>
      <p className="text-justify">
        Check out our HELPKIT to be prepared for schooling:{" "}
        <a
          href="https://bit.ly/MADE4Learning-STUDENT-HelpKit"
          target="_blank"
          className="text-blue-600 underline"
        >
          https://bit.ly/MADE4Learning-STUDENT-HelpKit
        </a>
        .
      </p>
      <p className="text-justify">
        For queries / concerns / clarifications, you can reach your respective
        program departments directly or drop them a message through Facebook:{" "}
        <a
          href="bit.ly/CITVirtualServiceRepresentatives"
          target="_blank"
          className="text-blue-600 underline"
        >
          bit.ly/CITVirtualServiceRepresentatives
        </a>{" "}
        or through our SEND US A MESSAGE feature in our website: www.cit.edu.
      </p>
      <p className="text-justify">
        We advise you to keep safe and stay healthy. Be informed by being
        updated through our Facebook page:{" "}
        <a
          href="https://www.facebook.com/CITUniversity/"
          target="_blank"
          className="text-blue-600 underline"
        >
          https://www.facebook.com/CITUniversity/
        </a>
        .
      </p>
    </div>
  );
};
