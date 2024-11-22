import React from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { ApplicantData } from "@/types/ApplicantData";

import UserProfileUpdatePhoto from "./userProfileUpdatePhoto";

interface Tab1Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
}

export const Tab1 = ({ formData, updateFormData }: Tab1Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: name === "birthdate" ? new Date(value) : value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Photo Section */}
        <section className="relative flex-1">
          <UserProfileUpdatePhoto />
        </section>

        {/* Bio Section */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Bio</h2>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write a brief introduction about yourself..."
              className="min-h-[265px] text-justify"
              value={""}
              onChange={() => {}}
            />
          </CardContent>
        </Card>
      </div>

      {/* Personal Information Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Personal Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                type="text"
                name="firstName"
                placeholder="Juan"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                type="text"
                name="lastName"
                placeholder="Dela Cruz"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="number"
                name="age"
                placeholder="e.g. 29"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <Input
                type="text"
                name="gender"
                placeholder="Male/Female"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nationality
              </label>
              <Input
                type="text"
                name="nationality"
                placeholder="Filipino"
                value={formData.nationality}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Religion</label>
              <Input
                type="text"
                name="religion"
                placeholder="e.g. Catholic"
                value={formData.religion}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birthdate
              </label>
              <Input
                type="date"
                name="birthdate"
                value={
                  formData.birthdate &&
                  !isNaN(new Date(formData.birthdate).getTime())
                    ? new Date(formData.birthdate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birthplace
              </label>
              <Input
                type="text"
                name="birthplace"
                placeholder="City, Province, Country"
                value={formData.birthplace}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Civil Status & Family Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Civil Status
              </label>
              <Input
                type="text"
                name="civilStatus"
                placeholder="e.g. Single"
                value={formData.civilStatus}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birth Rank
              </label>
              <Input
                type="text"
                name="birthRank"
                placeholder="e.g. 1st"
                value={formData.birthRank}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Family Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Brothers
              </label>
              <Input
                type="number"
                name="numBrothers"
                placeholder="e.g. 2"
                value={formData.numBrothers}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Sisters
              </label>
              <Input
                type="number"
                name="numSisters"
                placeholder="e.g. 3"
                value={formData.numSisters}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Brothers/Sisters at CIT
              </label>
              <Input
                type="number"
                name="numCITBrothersSisters"
                placeholder="e.g. 1"
                value={formData.numCITBrothersSisters}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Address Information */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Address Information</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Home Address
              </label>
              <Input
                type="text"
                name="homeAddress"
                placeholder="Home address"
                value={formData.homeAddress}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                City Address
              </label>
              <Input
                type="text"
                name="cityAddress"
                placeholder="City address"
                value={formData.cityAddress}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Accounts */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Social Media Accounts</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Facebook URL
              </label>
              <Input
                type="url"
                name="facebookURL"
                placeholder="https://facebook.com/username"
                value={formData.facebookURL}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number
              </label>
              <Input
                type="text"
                name="mobileNumber"
                placeholder="e.g. 09296901573"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
