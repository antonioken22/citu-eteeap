import Image from "next/image";

import { Input } from "@/components/ui/input";
import { ApplicantData } from "@/types/ApplicantData";

import ProgramsOffered from "@/public/application-forms/programs-offered.png";

interface Tab5Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
  canEdit: boolean;
}

export const Tab5 = ({ formData, updateFormData, canEdit }: Tab5Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Educational Background</h2>

      {/* Educational Attainment */}
      <label className="block">
        <span className="font-medium">Highest Educational Attainment*:</span>
        <div className="flex flex-col mt-1">
          {["Post-Graduate", "College", "High School", "Elementary"].map(
            (level) => (
              <label key={level}>
                <input
                  type="radio"
                  disabled={!canEdit}
                  name="educationalAttainment"
                  value={level}
                  checked={formData.educationalAttainment === level}
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
              name="educationalAttainment"
              value=""
              checked={[
                "Post-Graduate",
                "College",
                "High School",
                "Elementary",
              ].every((level) => formData.educationalAttainment !== level)}
              onChange={handleInputChange}
            />
            <span className="ml-2">Other:</span>
            <Input
              type="text"
              name="educationalAttainment"
              readOnly={!canEdit}
              placeholder="Specify education level"
              value={
                ["Post-Graduate", "College", "High School", "Elementary"].every(
                  (level) => formData.educationalAttainment !== level
                )
                  ? formData.educationalAttainment
                  : ""
              }
              onChange={handleInputChange}
              className="w-full ml-2"
            />
          </label>
        </div>
      </label>

      {/* Previous Education */}
      <h3 className="text-md font-semibold text-center">Previous Education</h3>
      <label className="block">
        <span className="font-medium">
          Previous Course (If Transferee/College Graduate)*:
        </span>
        <Input
          type="text"
          name="prevCourse"
          required
          readOnly={!canEdit}
          placeholder="e.g. BS Computer Science"
          value={formData.prevCourse}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Last School Attended*:</span>
        <Input
          type="text"
          name="lastSchool"
          required
          readOnly={!canEdit}
          placeholder="e.g. Cebu Institute of Technology - University"
          value={formData.lastSchool}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">School Year*:</span>
        <Input
          type="text"
          name="schoolYear"
          required
          readOnly={!canEdit}
          placeholder="e.g. 2018-2022"
          value={formData.schoolYear}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">School Type*:</span>
        <div className="flex flex-col mt-1">
          {["Public", "Private"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                disabled={!canEdit}
                name="schoolType"
                required
                readOnly={!canEdit}
                value={option}
                checked={formData.schoolType === option}
                onChange={handleInputChange}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      </label>

      <label className="block">
        <span className="font-medium">Previous School Address*:</span>
        <Input
          type="text"
          name="prevSchoolAddress"
          required
          readOnly={!canEdit}
          placeholder="Barangay, City, Province"
          value={formData.prevSchoolAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* High School */}
      <h3 className="text-md font-semibold text-center">High School</h3>
      <label className="block">
        <span className="font-medium">High School Name*:</span>
        <Input
          type="text"
          name="hsSchoolName"
          required
          readOnly={!canEdit}
          placeholder="e.g. Cebu Institute of Technology - University"
          value={formData.hsSchoolName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">High School Address*:</span>
        <Input
          type="text"
          name="hsSchoolAddress"
          required
          readOnly={!canEdit}
          placeholder="Barangay, City, Province"
          value={formData.hsSchoolAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Year Graduated*:</span>
        <Input
          type="text"
          name="hsYearGraduated"
          required
          readOnly={!canEdit}
          placeholder="e.g. 2016"
          value={formData.hsYearGraduated}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Elementary */}
      <h3 className="text-md font-semibold text-center">Elementary</h3>
      <label className="block">
        <span className="font-medium">Elementary School Name*:</span>
        <Input
          type="text"
          name="elemSchoolName"
          required
          readOnly={!canEdit}
          placeholder="e.g. Cebu Institute of Technology - University"
          value={formData.elemSchoolName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Elementary School Address*:</span>
        <Input
          type="text"
          name="elemSchoolAddress"
          required
          readOnly={!canEdit}
          placeholder="Barangay, City, Province"
          value={formData.elemSchoolAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Year Graduated*:</span>
        <Input
          type="text"
          name="elemYearGraduated"
          required
          readOnly={!canEdit}
          placeholder="e.g. 2012"
          value={formData.elemYearGraduated}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Programs Covered Image Placeholder */}
      <div className="bg-muted p-4 rounded-lg flex flex-col items-center space-y-2">
        <p className="text-lg font-semibold">Programs Offered in ETEEAP</p>
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

      <label className="block">
        <span className="font-medium">First Program Choice*:</span>
        <Input
          type="text"
          name="progChoice1"
          required
          readOnly={!canEdit}
          placeholder="e.g. BSBA General Business Management"
          value={formData.progChoice1}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Second Program Choice*:</span>
        <Input
          type="text"
          name="progChoice2"
          required
          readOnly={!canEdit}
          placeholder="e.g. BSBA Marketing Management"
          value={formData.progChoice2}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Third Program Choice*:</span>
        <Input
          type="text"
          name="progChoice3"
          required
          readOnly={!canEdit}
          placeholder="e.g. BS in Civil Engineering"
          value={formData.progChoice3}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>
    </div>
  );
};
