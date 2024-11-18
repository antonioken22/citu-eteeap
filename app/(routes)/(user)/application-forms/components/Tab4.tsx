import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApplicantData } from "@/types/ApplicantData";

interface Tab4Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
  handleTabChange: (tabValue: string) => void;
}

export const Tab4 = ({
  formData,
  updateFormData,
  handleTabChange,
}: Tab4Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Parents Profile</h2>

      {/* Father's Name */}
      <label className="block">
        <span className="font-medium">Father&apos;s Name:</span>
        <Input
          type="text"
          name="fatherName"
          placeholder="e.g. Juan A. Dela Cruz Sr."
          value={formData.fatherName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Age */}
      <label className="block">
        <span className="font-medium">Father&apos;s Age:</span>
        <Input
          type="number"
          name="fatherAge"
          placeholder="e.g. 50"
          value={formData.fatherAge}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Birthplace */}
      <label className="block">
        <span className="font-medium">Father&apos;s Birthplace:</span>
        <Input
          type="text"
          name="fatherBirthplace"
          placeholder="City, Province"
          value={formData.fatherBirthplace}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Nationality */}
      <label className="block">
        <span className="font-medium">Father&apos;s Nationality:</span>
        <Input
          type="text"
          name="fatherNationality"
          placeholder="Filipino"
          value={formData.fatherNationality}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Religion */}
      <label className="block">
        <span className="font-medium">Father&apos;s Religion:</span>
        <Input
          type="text"
          name="fatherReligion"
          placeholder="e.g. Roman Catholic"
          value={formData.fatherReligion}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Education */}
      <label className="block">
        <span className="font-medium">Father&apos;s Education:</span>
        <Input
          type="text"
          name="fatherEducation"
          placeholder="e.g. Bachelor's Degree"
          value={formData.fatherEducation}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Father's Occupation */}
      <label className="block">
        <span className="font-medium">Father&apos;s Occupation:</span>
        <Input
          type="text"
          name="fatherOccupation"
          placeholder="e.g. Civil Engineer"
          value={formData.fatherOccupation}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Name */}
      <label className="block mt-6">
        <span className="font-medium">Mother&apos;s Name:</span>
        <Input
          type="text"
          name="motherName"
          placeholder="e.g. Maria C. Dela Cruz"
          value={formData.motherName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Age */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Age:</span>
        <Input
          type="number"
          name="motherAge"
          placeholder="e.g. 48"
          value={formData.motherAge}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Birthplace */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Birthplace:</span>
        <Input
          type="text"
          name="motherBirthplace"
          placeholder="City, Province"
          value={formData.motherBirthplace}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Nationality */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Nationality:</span>
        <Input
          type="text"
          name="motherNationality"
          placeholder="Filipino"
          value={formData.motherNationality}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Religion */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Religion:</span>
        <Input
          type="text"
          name="motherReligion"
          placeholder="e.g. Roman Catholic"
          value={formData.motherReligion}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Education */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Education:</span>
        <Input
          type="text"
          name="motherEducation"
          placeholder="e.g. Bachelor's Degree"
          value={formData.motherEducation}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Mother's Occupation */}
      <label className="block">
        <span className="font-medium">Mother&apos;s Occupation:</span>
        <Input
          type="text"
          name="motherOccupation"
          placeholder="e.g. Teacher"
          value={formData.motherOccupation}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Previous and Next buttons */}
      <div className="flex justify-between mt-8">
        <Button className="px-4 py-2" onClick={() => handleTabChange("tab3")}>
          Previous
        </Button>
        <Button className="px-4 py-2" onClick={() => handleTabChange("tab5")}>
          Next
        </Button>
      </div>
    </div>
  );
};
