import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/config";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useUserState from "@/hooks/use-user-state";
import UserProfileUpdatePhoto from "./userProfileUpdatePhoto";

export const Tab1 = ({ handleTabChange }: any) => {
  const {
    userId,
    userFirstName,
    userLastName,
    userBio,
    userAge,
    userGender,
    userNationality,
    userReligion,
    userBirthdate,
    userBirthplace,
    userCivilStatus,
    userBirthRank,
    userNumBrothers,
    userNumSisters,
    userNumCITBrothersSisters,
    userHomeAddress,
    userCityAddress,
    userFacebookURL,
    userMobileNumber,
  } = useUserState();
  const [bio, setBio] = useState(userBio || "");
  const [firstName, setFirstName] = useState(userFirstName || "");
  const [lastName, setLastName] = useState(userLastName || "");
  const [age, setAge] = useState(userAge || "");
  const [gender, setGender] = useState(userGender || "");
  const [nationality, setNationality] = useState(userNationality || "");
  const [religion, setReligion] = useState(userReligion || "");
  const [birthdate, setBirthdate] = useState(userBirthdate || "");
  const [birthplace, setBirthplace] = useState(userBirthplace || "");
  const [civilStatus, setCivilStatus] = useState(userCivilStatus || "");
  const [birthRank, setBirthRank] = useState(userBirthRank || "");
  const [numBrothers, setNumBrothers] = useState(userNumBrothers || "");
  const [numSisters, setNumSisters] = useState(userNumSisters || "");
  const [numCITBrothersSisters, setNumCITBrothersSisters] = useState(
    userNumCITBrothersSisters || ""
  );
  const [homeAddress, setHomeAddress] = useState(userHomeAddress || "");
  const [cityAddress, setCityAddress] = useState(userCityAddress || "");
  const [facebookURL, setFacebookURL] = useState(userFacebookURL || "");
  const [mobileNumber, setMobileNumber] = useState(userMobileNumber || "");

  useEffect(() => {
    if (userId) {
      setFirstName(userFirstName || "");
      setLastName(userLastName || "");
      setBio(userBio || "");
      setAge(userAge || "");
      setGender(userGender || "");
      setNationality(userNationality || "");
      setReligion(userReligion || "");
      setBirthdate(userBirthdate || "");
      setBirthplace(userBirthplace || "");
      setCivilStatus(userCivilStatus || "");
      setBirthRank(userBirthRank || "");
      setNumBrothers(userNumBrothers || "");
      setNumSisters(userNumSisters || "");
      setNumCITBrothersSisters(userNumCITBrothersSisters || "");
      setHomeAddress(userHomeAddress || "");
      setCityAddress(userCityAddress || "");
      setFacebookURL(userFacebookURL || "");
      setMobileNumber(userMobileNumber || "");
    }
  }, [
    userId,
    userFirstName,
    userLastName,
    userBio,
    userAge,
    userGender,
    userNationality,
    userReligion,
    userBirthdate,
    userBirthplace,
    userCivilStatus,
    userBirthRank,
    userNumBrothers,
    userNumSisters,
    userNumCITBrothersSisters,
    userHomeAddress,
    userCityAddress,
    userFacebookURL,
    userMobileNumber,
  ]);

  const handleCancelChanges = () => {
    setFirstName(userFirstName || "");
    setLastName(userLastName || "");
    setBio(userBio || "");
    setAge(userAge || age || "");
    setGender(userGender || gender || "");
    setNationality(userNationality || nationality || "");
    setReligion(userReligion || "");
    setBirthdate(userBirthdate || "");
    setBirthplace(userBirthplace || "");
    setCivilStatus(userCivilStatus || "");
    setBirthRank(userBirthRank || "");
    setNumBrothers(userNumBrothers || "");
    setNumSisters(userNumSisters || "");
    setNumCITBrothersSisters(userNumCITBrothersSisters || "");
    setHomeAddress(userHomeAddress || "");
    setCityAddress(userCityAddress || "");
    setFacebookURL(userFacebookURL || "");
    setMobileNumber(userMobileNumber || "");
  };
  const handleSaveChanges = async () => {
    if (userId) {
      try {
        const userRef = doc(firestore, "users", userId);
        await updateDoc(userRef, {
          bio,
          firstName,
          lastName,
          age,
          gender,
          nationality,
          religion,
          birthdate,
          birthplace,
          civilStatus,
          birthRank,
          numBrothers,
          numSisters,
          numCITBrothersSisters,
          homeAddress,
          cityAddress,
          facebookURL,
          mobileNumber,
        });
        toast.success("Profile updated successfully!");
      } catch (error) {
        // console.error("Error updating profile:", error);
        toast.error("Error updating profile.");
      }
    }
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
              value={bio || ""}
              onChange={(e) => setBio(e.target.value)}
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="number"
                name="age"
                placeholder="e.g. 29"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <Input
                type="text"
                name="gender"
                placeholder="Male/Female"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Religion</label>
              <Input
                type="text"
                name="religion"
                placeholder="e.g. Catholic"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
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
                  birthdate instanceof Date
                    ? birthdate.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => setBirthdate(e.target.value)}
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
                value={birthplace}
                onChange={(e) => setBirthplace(e.target.value)}
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
                value={civilStatus}
                onChange={(e) => setCivilStatus(e.target.value)}
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
                value={birthRank}
                onChange={(e) => setBirthRank(e.target.value)}
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
                value={numBrothers}
                onChange={(e) => setNumBrothers(e.target.value)}
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
                value={numSisters}
                onChange={(e) => setNumSisters(e.target.value)}
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
                value={numCITBrothersSisters}
                onChange={(e) => setNumCITBrothersSisters(e.target.value)}
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
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
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
                value={cityAddress}
                onChange={(e) => setCityAddress(e.target.value)}
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
                value={facebookURL}
                onChange={(e) => setFacebookURL(e.target.value)}
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
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div
              role="button"
              className="mt-auto flex items-center justify-start py-2 "
            >
              <Button type="button" className="flex justify-end py-4">
                Save Changes
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Profile</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to save these changes?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelChanges}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleSaveChanges}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {/* Next Button */}
      <div className="flex justify-end">
        <Button onClick={() => handleTabChange("tab2")}>Next</Button>
      </div>
    </div>
  );
};
