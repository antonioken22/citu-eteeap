import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ApplicantData } from "@/types/ApplicantData";

interface Tab3Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
  handleTabChange: (tabValue: string) => void;
}

export const Tab3 = ({
  formData,
  updateFormData,
  handleTabChange,
}: Tab3Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: name === "birthdate" ? new Date(value) : value,
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Personal Information</h2>

      {/* Last Name */}
      <label className="block">
        <span className="font-medium">Last Name:</span>
        <Input
          type="text"
          name="lastName"
          placeholder="e.g. Dela Cruz"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* First Name */}
      <label className="block">
        <span className="font-medium">First Name:</span>
        <Input
          type="text"
          name="firstName"
          placeholder="e.g. Juan"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Age */}
      <label className="block">
        <span className="font-medium">Age:</span>
        <Input
          type="number"
          name="age"
          placeholder="e.g. 29"
          value={formData.age}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Gender */}
      <label className="block">
        <span className="font-medium">Gender:</span>
        <Input
          type="text"
          name="gender"
          placeholder="Male/Female"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Nationality */}
      <label className="block">
        <span className="font-medium">Nationality:</span>
        <Input
          type="text"
          name="nationality"
          placeholder="Filipino"
          value={formData.nationality}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Religion */}
      <label className="block">
        <span className="font-medium">Religion:</span>
        <Input
          type="text"
          name="religion"
          placeholder="e.g. Roman Catholic"
          value={formData.religion}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Birthdate */}
      <label className="block">
        <span className="font-medium">Birthdate:</span>
        <Input
          type="date"
          name="birthdate"
          value={
            formData.birthdate && !isNaN(new Date(formData.birthdate).getTime())
              ? new Date(formData.birthdate).toISOString().split("T")[0]
              : ""
          }
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Birthplace */}
      <label className="block">
        <span className="font-medium">Birthplace:</span>
        <Input
          type="text"
          name="birthplace"
          placeholder="Barangay, City, Province"
          value={formData.birthplace}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Civil Status */}
      <label className="block">
        <span className="font-medium">Civil Status:</span>
        <Input
          type="text"
          name="civilStatus"
          placeholder="e.g. Single"
          value={formData.civilStatus}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Family Information */}
      <label className="block">
        <span className="font-medium">Birth Rank:</span>
        <Input
          type="text"
          name="birthRank"
          placeholder="e.g. 1st"
          value={formData.birthRank}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Number of Brothers:</span>
        <Input
          type="number"
          name="numBrothers"
          placeholder="e.g. 2"
          value={formData.numBrothers}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Number of Sisters:</span>
        <Input
          type="number"
          name="numSisters"
          placeholder="e.g. 3"
          value={formData.numSisters}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Number of Brothers/Sisters at CIT:</span>
        <Input
          type="number"
          name="numCITBrothersSisters"
          placeholder="e.g. 1"
          value={formData.numCITBrothersSisters}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Address Information */}
      <label className="block">
        <span className="font-medium">Home Address:</span>
        <Input
          type="text"
          name="homeAddress"
          placeholder="Barangay, City, Province"
          value={formData.homeAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">City Address:</span>
        <Input
          type="text"
          name="cityAddress"
          placeholder="Barangay, City, Province"
          value={formData.cityAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Social Information */}
      <label className="block">
        <span className="font-medium">Facebook URL:</span>
        <Input
          type="url"
          name="facebookURL"
          placeholder="https://facebook.com/username"
          value={formData.facebookURL}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Mobile Number:</span>
        <Input
          type="text"
          name="mobileNumber"
          placeholder="e.g. 09296901573"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Previous and Next buttons */}
      <div className="flex justify-between mt-8">
        <Button className="px-4 py-2 " onClick={() => handleTabChange("tab2")}>
          Previous
        </Button>
        <Button className="px-4 py-2 " onClick={() => handleTabChange("tab4")}>
          Next
        </Button>
      </div>
    </div>
  );
};
