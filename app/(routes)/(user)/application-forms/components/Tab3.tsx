import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ApplicantData } from "@/types/ApplicantData";

interface Tab3Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
}

export const Tab3 = ({ formData, updateFormData }: Tab3Props) => {
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
          required
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
          required
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
          required
          placeholder="e.g. 29"
          value={formData.age}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Gender */}
      <label className="block">
        <span className="font-medium">Gender:</span>
        <div className="flex flex-col mt-1">
          {["Male", "Female"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="gender"
                required
                value={option}
                checked={formData.gender === option}
                onChange={handleInputChange}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      </label>

      {/* Nationality */}
      <label className="block">
        <span className="font-medium">Nationality:</span>
        <div className="flex flex-col mt-1">
          <label>
            <input
              type="radio"
              name="nationality"
              value="Filipino"
              checked={formData.nationality === "Filipino"}
              onChange={handleInputChange}
            />
            <span className="ml-2">Filipino</span>
          </label>
          <label className="flex items-center mt-1">
            <input
              type="radio"
              name="nationality"
              value=""
              checked={formData.nationality !== "Filipino"}
              onChange={handleInputChange}
            />
            <span className="ml-2">Other:</span>
            <Input
              type="text"
              name="nationality"
              placeholder="Specify nationality"
              value={
                formData.nationality !== "Filipino" ? formData.nationality : ""
              }
              onChange={handleInputChange}
              className="w-full ml-2"
            />
          </label>
        </div>
      </label>

      {/* Religion */}
      <label className="block">
        <span className="font-medium">Religion:</span>
        <Input
          type="text"
          name="religion"
          required
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
          required
          placeholder="Barangay, City, Province"
          value={formData.birthplace}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Civil Status */}
      <label className="block">
        <span className="font-medium">Civil Status:</span>
        <div className="flex flex-col mt-1">
          {["Single", "Married", "Divorced", "Widowed/Widower"].map(
            (option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="civilStatus"
                  required
                  value={option}
                  checked={formData.civilStatus === option}
                  onChange={handleInputChange}
                />
                <span className="ml-2">{option}</span>
              </label>
            )
          )}
        </div>
      </label>

      {/* Family Information */}
      <label className="block">
        <span className="font-medium">Birth Rank:</span>
        <Input
          type="text"
          name="birthRank"
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
          placeholder="e.g. 09296901573"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <p className="text-sm text-muted-foreground italic">
        Note: Make sure to input the correct Email Address, Facebook URL, and
        Mobile Number. We will be communicating with you through the contact
        information you have provided.
      </p>
    </div>
  );
};
