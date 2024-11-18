import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApplicantData } from "@/types/ApplicantData";

interface Tab5Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
  handleTabChange: (tabValue: string) => void;
}

export const Tab5 = ({
  formData,
  updateFormData,
  handleTabChange,
}: Tab5Props) => {
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
        <span className="font-medium">Previous Course:</span>
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
          placeholder="e.g. ABC University"
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
          placeholder="e.g. XYZ High School"
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
          placeholder="e.g. ABC Elementary School"
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

      {/* Program Choices */}
      <h3 className="text-md font-semibold text-center">Program Choices</h3>
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

      {/* Previous and Next buttons */}
      <div className="flex justify-between mt-8">
        <Button className="px-4 py-2" onClick={() => handleTabChange("tab4")}>
          Previous
        </Button>
        <Button className="px-4 py-2" onClick={() => handleTabChange("tab6")}>
          Next
        </Button>
      </div>
    </div>
  );
};
