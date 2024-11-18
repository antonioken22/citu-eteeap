import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import CITUBanner from "@/public/application-forms/citu-banner.png";

export const Tab1 = ({ formData, updateFormData, handleTabChange }: any) => {
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      {/* Image at the top */}
      <div className="flex justify-center mb-4">
        <Image
          src={CITUBanner}
          alt="CIT University Banner"
          width={2876}
          height={715}
          placeholder="blur"
          loading="eager"
          className="w-full object-cover rounded-md"
        />
      </div>

      {/* Title and description */}
      <h2 className="text-xl font-bold text-center">
        CIT University ETEEAP Enrollment Form
      </h2>
      <div className="text-red-600 font-semibold">IMPORTANT:</div>
      <p className="text-justify">
        Please read all the instructions of this link thoroughly so that there
        will be no redos of the process. You cannot be admitted unless you
        submit essential documents. However, because of the lockdowns, we will
        allow admission and enrollment, provided that the “I ACCEPT” box of the
        waiver in this form will be marked ✅, meaning you agree and consent to
        the undertaking/waiver. Also, mark ✅ the boxes next to the documents
        that you cannot submit momentarily and will submit later. Do not mark ✅
        the boxes next to the documents you can submit now. Leave these boxes
        blank.
      </p>
      <p className="text-justify">
        The undertaking/waiver is a document that declares that you will be
        allowed admission by the university, provided you comply with all the
        provisions in the undertaking/waiver, including the submission of
        documents later for documents you cannot submit now, among others. To
        show that you agree, and that it is you, personally, agreeing to the
        undertaking/waiver, you have to mark ✅ the “I AGREE” box and you have
        to attach a picture of your face next to your company ID or a
        Government-issued ID, both taken as one (1) single shot/photo. Make sure
        that your name and your picture contained in your ID are clear,
        readable, and recognizable.
      </p>
      <p className="text-red-600 font-semibold">
        ● Please tick the “I have read and understood.” box.
      </p>

      {/* Email input field */}
      <label className="block mt-4">
        <span className="font-medium">Email:</span>
        <Input
          type="email"
          name="activeEmail"
          disabled
          value={formData.activeEmail}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Checkbox for agreement */}
      <label className="flex items-center mt-4">
        <Input
          type="checkbox"
          name="isQuestionReadAndUnderstood"
          required
          checked={formData.isQuestionReadAndUnderstood}
          onChange={(e) =>
            updateFormData({ isQuestionReadAndUnderstood: e.target.checked })
          }
          className="w-4 h-4 mr-2"
        />
        <span>I have read and understood.</span>
      </label>

      {/* Previous and Next buttons */}
      <div className="flex justify-end mt-8">
        <Button
          className="px-4 py-2 rounded "
          onClick={() => handleTabChange("tab2")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
