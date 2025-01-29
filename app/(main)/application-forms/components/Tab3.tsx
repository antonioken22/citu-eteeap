"use client";

import { Input } from "@/components/ui/input";

import { ApplicantData } from "@/types/ApplicantData";

// Helper function
const isFirestoreTimestamp = (
  value: any
): value is { seconds: number; nanoseconds: number } => {
  return (
    value &&
    typeof value.seconds === "number" &&
    typeof value.nanoseconds === "number"
  );
};

type Tab3Props = {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
  canEdit: boolean;
};

export const Tab3 = ({ formData, updateFormData, canEdit }: Tab3Props) => {
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
        <span className="font-medium">Last Name*:</span>
        <Input
          type="text"
          name="lastName"
          required
          readOnly={!canEdit}
          placeholder="e.g. Dela Cruz"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* First Name */}
      <label className="block">
        <span className="font-medium">First Name*:</span>
        <Input
          type="text"
          name="firstName"
          required
          readOnly={!canEdit}
          placeholder="e.g. Juan"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Age */}
      <label className="block">
        <span className="font-medium">Age*:</span>
        <Input
          type="number"
          name="age"
          required
          readOnly={!canEdit}
          placeholder="e.g. 29"
          value={formData.age}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Gender */}
      <label className="block">
        <span className="font-medium">Gender*:</span>
        <div className="flex flex-col mt-1">
          {["Male", "Female"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="gender"
                required
                disabled={!canEdit}
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
        <span className="font-medium">Nationality*:</span>
        <div className="flex flex-col mt-1">
          <label>
            <input
              type="radio"
              name="nationality"
              value="Filipino"
              disabled={!canEdit}
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
              disabled={!canEdit}
              checked={formData.nationality !== "Filipino"}
              onChange={handleInputChange}
            />
            <span className="ml-2">Other:</span>
            <Input
              type="text"
              name="nationality"
              readOnly={!canEdit}
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
        <span className="font-medium">Religion*:</span>
        <Input
          type="text"
          name="religion"
          required
          readOnly={!canEdit}
          placeholder="e.g. Roman Catholic"
          value={formData.religion}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Birthdate */}
      <label className="block">
        <span className="font-medium">Birthdate*:</span>
        <Input
          type="date"
          name="birthdate"
          required
          readOnly={!canEdit}
          value={
            formData.birthdate
              ? isFirestoreTimestamp(formData.birthdate)
                ? new Date(formData.birthdate.seconds * 1000)
                    .toISOString()
                    .split("T")[0]
                : new Date(formData.birthdate).toISOString().split("T")[0]
              : ""
          }
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Birthplace */}
      <label className="block">
        <span className="font-medium">Birthplace*:</span>
        <Input
          type="text"
          name="birthplace"
          required
          readOnly={!canEdit}
          placeholder="Barangay, City, Province"
          value={formData.birthplace}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Civil Status */}
      <label className="block">
        <span className="font-medium">Civil Status*:</span>
        <div className="flex flex-col mt-1">
          {["Single", "Married", "Divorced", "Widowed/Widower"].map(
            (option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="civilStatus"
                  required
                  disabled={!canEdit}
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
        <span className="font-medium">Birth Rank*:</span>
        <Input
          type="text"
          name="birthRank"
          required
          readOnly={!canEdit}
          placeholder="e.g. 1st"
          value={formData.birthRank}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Number of Brothers*:</span>
        <Input
          type="number"
          name="numBrothers"
          required
          readOnly={!canEdit}
          placeholder="e.g. 2"
          value={formData.numBrothers}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Number of Sisters*:</span>
        <Input
          type="number"
          name="numSisters"
          required
          readOnly={!canEdit}
          placeholder="e.g. 3"
          value={formData.numSisters}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Number of Brothers/Sisters at CIT*:</span>
        <Input
          type="number"
          name="numCITBrothersSisters"
          required
          readOnly={!canEdit}
          placeholder="e.g. 1"
          value={formData.numCITBrothersSisters}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Address Information */}
      <label className="block">
        <span className="font-medium">Home Address*:</span>
        <Input
          type="text"
          name="homeAddress"
          required
          readOnly={!canEdit}
          placeholder="Barangay, City, Province"
          value={formData.homeAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">City Address*:</span>
        <Input
          type="text"
          name="cityAddress"
          required
          readOnly={!canEdit}
          placeholder="Barangay, City, Province"
          value={formData.cityAddress}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      {/* Social Information */}
      <label className="block">
        <span className="font-medium">Facebook URL*:</span>
        <Input
          type="url"
          name="facebookURL"
          required
          readOnly={!canEdit}
          placeholder="https://facebook.com/username"
          value={formData.facebookURL}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="font-medium">Mobile Number*:</span>
        <Input
          type="text"
          name="mobileNumber"
          required
          readOnly={!canEdit}
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
