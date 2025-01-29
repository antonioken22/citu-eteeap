"use client";

import { Input } from "@/components/ui/input";

import { ApplicantData } from "@/types/ApplicantData";

type Tab4Props = {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
  canEdit: boolean;
};

export const Tab4 = ({ formData, updateFormData, canEdit }: Tab4Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Parents Profile</h2>

      {/* Father */}
      <h3 className="text-md font-semibold text-center">
        Father&apos;s Profile
      </h3>
      {/* Father's Name */}
      <label className="block">
        <span className="font-medium">Father&apos;s Name*:</span>
        <Input
          type="text"
          name="fatherName"
          required
          readOnly={!canEdit}
          placeholder="e.g. Juan A. Dela Cruz Sr."
          value={formData.fatherName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Age */}
      <label className="block">
        <span className="font-medium">Father&apos;s Age*:</span>
        <Input
          type="number"
          name="fatherAge"
          required
          readOnly={!canEdit}
          placeholder="e.g. 50"
          value={formData.fatherAge}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Birthplace */}
      <label className="block">
        <span className="font-medium">Father&apos;s Birthplace*:</span>
        <Input
          type="text"
          name="fatherBirthplace"
          required
          readOnly={!canEdit}
          placeholder="City, Province"
          value={formData.fatherBirthplace}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Nationality */}
      <label className="block">
        <span className="font-medium">Father&apos;s Nationality*:</span>
        <div className="flex flex-col mt-1">
          <label>
            <input
              type="radio"
              disabled={!canEdit}
              name="fatherNationality"
              value="Filipino"
              checked={formData.fatherNationality === "Filipino"}
              onChange={handleInputChange}
            />
            <span className="ml-2">Filipino</span>
          </label>
          <label className="flex items-center mt-1">
            <input
              type="radio"
              disabled={!canEdit}
              name="fatherNationality"
              value=""
              checked={formData.fatherNationality !== "Filipino"}
              onChange={handleInputChange}
            />
            <span className="ml-2">Other:</span>
            <Input
              type="text"
              name="fatherNationality"
              readOnly={!canEdit}
              placeholder="Specify nationality"
              value={
                formData.fatherNationality !== "Filipino"
                  ? formData.fatherNationality
                  : ""
              }
              onChange={handleInputChange}
              className="w-full ml-2"
            />
          </label>
        </div>
      </label>

      {/* Father's Religion */}
      <label className="block">
        <span className="font-medium">Father&apos;s Religion*:</span>
        <Input
          type="text"
          name="fatherReligion"
          required
          readOnly={!canEdit}
          placeholder="e.g. Roman Catholic"
          value={formData.fatherReligion}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Education */}
      <label className="block">
        <span className="font-medium">Father&apos;s Education*:</span>
        <div className="flex flex-col mt-1">
          {["Post-Graduate", "College", "High School", "Elementary"].map(
            (level) => (
              <label key={level}>
                <input
                  type="radio"
                  disabled={!canEdit}
                  name="fatherEducation"
                  value={level}
                  checked={formData.fatherEducation === level}
                  onChange={handleInputChange}
                />
                <span className="ml-2">{level}</span>
              </label>
            )
          )}
          <label className="flex items-center mt-1">
            <input
              type="radio"
              disabled={!canEdit}
              name="fatherEducation"
              value=""
              checked={[
                "Post-Graduate",
                "College",
                "High School",
                "Elementary",
              ].every((level) => formData.fatherEducation !== level)}
              onChange={handleInputChange}
            />
            <span className="ml-2">Other:</span>
            <Input
              type="text"
              name="fatherEducation"
              readOnly={!canEdit}
              placeholder="Specify education level"
              value={
                ["Post-Graduate", "College", "High School", "Elementary"].every(
                  (level) => formData.fatherEducation !== level
                )
                  ? formData.fatherEducation
                  : ""
              }
              onChange={handleInputChange}
              className="w-full ml-2"
            />
          </label>
        </div>
      </label>

      {/* Father's Occupation */}
      <label className="block">
        <span className="font-medium">Father&apos;s Occupation*:</span>
        <Input
          type="text"
          name="fatherOccupation"
          required
          readOnly={!canEdit}
          placeholder="e.g. Civil Engineer"
          value={formData.fatherOccupation}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother */}
      <h3 className="text-md font-semibold text-center">
        Mother&apos;s Profile
      </h3>
      {/* Mother's Name */}
      <label className="block mt-6">
        <span className="font-medium">Mother&apos;s Name*:</span>
        <Input
          type="text"
          name="motherName"
          required
          readOnly={!canEdit}
          placeholder="e.g. Maria C. Dela Cruz"
          value={formData.motherName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Age */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Age*:</span>
        <Input
          type="number"
          name="motherAge"
          required
          readOnly={!canEdit}
          placeholder="e.g. 48"
          value={formData.motherAge}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Birthplace */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Birthplace*:</span>
        <Input
          type="text"
          name="motherBirthplace"
          required
          readOnly={!canEdit}
          placeholder="City, Province"
          value={formData.motherBirthplace}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Nationality */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Nationality*:</span>
        <div className="flex flex-col mt-1">
          <label>
            <input
              type="radio"
              disabled={!canEdit}
              name="motherNationality"
              value="Filipino"
              checked={formData.motherNationality === "Filipino"}
              onChange={handleInputChange}
            />
            <span className="ml-2">Filipino</span>
          </label>
          <label className="flex items-center mt-1">
            <input
              type="radio"
              disabled={!canEdit}
              name="motherNationality"
              value=""
              checked={formData.motherNationality !== "Filipino"}
              onChange={handleInputChange}
            />
            <span className="ml-2">Other:</span>
            <Input
              type="text"
              name="motherNationality"
              readOnly={!canEdit}
              placeholder="Specify nationality"
              value={
                formData.motherNationality !== "Filipino"
                  ? formData.motherNationality
                  : ""
              }
              onChange={handleInputChange}
              className="w-full ml-2"
            />
          </label>
        </div>
      </label>

      {/* Mother's Religion */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Religion*:</span>
        <Input
          type="text"
          name="motherReligion"
          required
          readOnly={!canEdit}
          placeholder="e.g. Roman Catholic"
          value={formData.motherReligion}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Education */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Education*:</span>
        <div className="flex flex-col mt-1">
          {["Post-Graduate", "College", "High School", "Elementary"].map(
            (level) => (
              <label key={level}>
                <input
                  type="radio"
                  disabled={!canEdit}
                  name="motherEducation"
                  value={level}
                  checked={formData.motherEducation === level}
                  onChange={handleInputChange}
                />
                <span className="ml-2">{level}</span>
              </label>
            )
          )}
          <label className="flex items-center mt-1">
            <input
              type="radio"
              disabled={!canEdit}
              name="motherEducation"
              value=""
              checked={[
                "Post-Graduate",
                "College",
                "High School",
                "Elementary",
              ].every((level) => formData.motherEducation !== level)}
              onChange={handleInputChange}
            />
            <span className="ml-2">Other:</span>
            <Input
              type="text"
              name="motherEducation"
              readOnly={!canEdit}
              placeholder="Specify education level"
              value={
                ["Post-Graduate", "College", "High School", "Elementary"].every(
                  (level) => formData.motherEducation !== level
                )
                  ? formData.motherEducation
                  : ""
              }
              onChange={handleInputChange}
              className="w-full ml-2"
            />
          </label>
        </div>
      </label>

      {/* Mother's Occupation */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Occupation*:</span>
        <Input
          type="text"
          name="motherOccupation"
          required
          readOnly={!canEdit}
          placeholder="e.g. Teacher"
          value={formData.motherOccupation}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Emergency Contact */}
      <h2 className="text-lg font-bold text-center">Emergency Contact</h2>
      {/* Contact Person's Name */}
      <label className="block mt-6">
        <span className="font-medium">Contact Person&apos;s Name*:</span>
        <Input
          type="text"
          name="emergencyContactName"
          required
          readOnly={!canEdit}
          placeholder="e.g. John Michael A. Dela Cerna"
          value={formData.emergencyContactName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>
      {/* Contact Person's Relationship*/}
      <label className="block mt-6">
        <span className="font-medium">
          Contact Person&apos;s Relationship*:
        </span>
        <Input
          type="text"
          name="emergencyContactRelationship"
          required
          readOnly={!canEdit}
          placeholder="e.g. Friend"
          value={formData.emergencyContactRelationship}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>
      {/* Contact Person's Address */}
      <label className="block mt-6">
        <span className="font-medium">Contact Person&apos;s Address*:</span>
        <Input
          type="text"
          name="emergencyContactAddress"
          required
          readOnly={!canEdit}
          placeholder="e.g. Barangay, City, Province"
          value={formData.emergencyContactAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>
      {/* Contact Person's Number */}
      <label className="block mt-6">
        <span className="font-medium">Contact Person&apos;s Number*:</span>
        <Input
          type="text"
          name="emergencyContactNumber"
          required
          readOnly={!canEdit}
          placeholder="e.g. 0929 690 1573"
          value={formData.emergencyContactNumber}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>
    </div>
  );
};
