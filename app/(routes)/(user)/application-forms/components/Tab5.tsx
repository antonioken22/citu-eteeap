import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApplicantData } from "@/types/ApplicantData";

import ProgramsOffered from "@/public/application-forms/programs-offered.png";

interface Tab5Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
}

export const Tab5 = ({ formData, updateFormData }: Tab5Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Educational Background</h2>

      {/* Previous Education */}
      <h3 className="text-md font-semibold text-center">Previous Education</h3>
      <label className="block">
        <span className="font-medium">
          Previous Course (If Transferee/College Graduate):
        </span>
        <Input
          type="text"
          name="prevCourse"
          required
          placeholder="e.g. BS Computer Science"
          value={formData.prevCourse}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Last School Attended:</span>
        <Input
          type="text"
          name="lastSchool"
          required
          placeholder="e.g. Cebu Institute of Technology - University"
          value={formData.lastSchool}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">School Year:</span>
        <Input
          type="text"
          name="schoolYear"
          required
          placeholder="e.g. 2018-2022"
          value={formData.schoolYear}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">School Type:</span>
        <div className="flex flex-col mt-1">
          {["Public", "Private"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="schoolType"
                required
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
        <span className="font-medium">Previous School Address:</span>
        <Input
          type="text"
          name="prevSchoolAddress"
          required
          placeholder="Barangay, City, Province"
          value={formData.prevSchoolAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* High School */}
      <h3 className="text-md font-semibold text-center">High School</h3>
      <label className="block">
        <span className="font-medium">High School Name:</span>
        <Input
          type="text"
          name="hsSchoolName"
          required
          placeholder="e.g. Cebu Institute of Technology - University"
          value={formData.hsSchoolName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">High School Address:</span>
        <Input
          type="text"
          name="hsSchoolAddress"
          required
          placeholder="Barangay, City, Province"
          value={formData.hsSchoolAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Year Graduated:</span>
        <Input
          type="text"
          name="hsYearGraduated"
          required
          placeholder="e.g. 2016"
          value={formData.hsYearGraduated}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Elementary */}
      <h3 className="text-md font-semibold text-center">Elementary</h3>
      <label className="block">
        <span className="font-medium">Elementary School Name:</span>
        <Input
          type="text"
          name="elemSchoolName"
          required
          placeholder="e.g. Cebu Institute of Technology - University"
          value={formData.elemSchoolName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Elementary School Address:</span>
        <Input
          type="text"
          name="elemSchoolAddress"
          required
          placeholder="Barangay, City, Province"
          value={formData.elemSchoolAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Year Graduated:</span>
        <Input
          type="text"
          name="elemYearGraduated"
          required
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
        <span className="font-medium">First Program Choice:</span>
        <Input
          type="text"
          name="progChoice1"
          required
          placeholder="e.g. BS Computer Engineering"
          value={formData.progChoice1}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Second Program Choice:</span>
        <Input
          type="text"
          name="progChoice2"
          required
          placeholder="e.g. BS Information Technology"
          value={formData.progChoice2}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Third Program Choice:</span>
        <Input
          type="text"
          name="progChoice3"
          required
          placeholder="e.g. BS Computer Science"
          value={formData.progChoice3}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>
    </div>
  );
};
