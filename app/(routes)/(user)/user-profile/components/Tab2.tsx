import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/config";

import { Input } from "@/components/ui/input";
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

export const Tab2 = ({ handleTabChange }: any) => {
  const {
    userId,
    userFatherName,
    userFatherAge,
    userFatherBirthplace,
    userFatherNationality,
    userFatherReligion,
    userFatherEducation,
    userFatherOccupation,
    userMotherName,
    userMotherAge,
    userMotherBirthplace,
    userMotherNationality,
    userMotherReligion,
    userMotherEducation,
    userMotherOccupation,
  } = useUserState();
  const [fatherName, setFatherName] = useState(userFatherName || "");
  const [fatherAge, setFatherAge] = useState(userFatherAge || "");
  const [fatherBirthplace, setFatherBirthplace] = useState(
    userFatherBirthplace || ""
  );
  const [fatherNationality, setFatherNationality] = useState(
    userFatherNationality || ""
  );
  const [fatherReligion, setFatherReligion] = useState(
    userFatherReligion || ""
  );
  const [fatherEducation, setFatherEducation] = useState(
    userFatherEducation || ""
  );
  const [fatherOccupation, setFatherOccupation] = useState(
    userFatherOccupation || ""
  );
  const [motherName, setMotherName] = useState(userMotherName || "");
  const [motherAge, setMotherAge] = useState(userMotherAge || "");
  const [motherBirthplace, setMotherBirthplace] = useState(
    userMotherBirthplace || ""
  );
  const [motherNationality, setMotherNationality] = useState(
    userMotherNationality || ""
  );
  const [motherReligion, setMotherReligion] = useState(
    userMotherReligion || ""
  );
  const [motherEducation, setMotherEducation] = useState(
    userMotherEducation || ""
  );
  const [motherOccupation, setMotherOccupation] = useState(
    userMotherOccupation || ""
  );

  useEffect(() => {
    if (userId) {
      setFatherName(userFatherName || "");
      setFatherAge(userFatherAge || "");
      setFatherBirthplace(userFatherBirthplace || "");
      setFatherNationality(userFatherNationality || "");
      setFatherReligion(userFatherReligion || "");
      setFatherEducation(userFatherEducation || "");
      setFatherOccupation(userFatherOccupation || "");
      setMotherName(userMotherName || "");
      setMotherAge(userMotherAge || "");
      setMotherBirthplace(userMotherBirthplace || "");
      setMotherNationality(userMotherNationality || "");
      setMotherReligion(userMotherReligion || "");
      setMotherEducation(userMotherEducation || "");
      setMotherOccupation(userMotherOccupation || "");
    }
  }, [
    userId,
    userMotherName,
    userMotherAge,
    userMotherBirthplace,
    userMotherNationality,
    userMotherReligion,
    userMotherEducation,
    userMotherOccupation,
    userFatherName,
    userFatherAge,
    userFatherBirthplace,
    userFatherNationality,
    userFatherReligion,
    userFatherEducation,
    userFatherOccupation,
  ]);

  const handleCancelChanges = () => {
    setFatherName(userFatherName || "");
    setFatherAge(userFatherAge || "");
    setFatherBirthplace(userFatherBirthplace || "");
    setFatherNationality(userFatherNationality || "");
    setFatherReligion(userFatherReligion || "");
    setFatherEducation(userFatherEducation || "");
    setFatherOccupation(userFatherOccupation || "");
    setMotherName(userMotherName || "");
    setMotherAge(userMotherAge || "");
    setMotherBirthplace(userMotherBirthplace || "");
    setMotherNationality(userMotherNationality || "");
    setMotherReligion(userMotherReligion || "");
    setMotherEducation(userMotherEducation || "");
    setMotherOccupation(userMotherOccupation || "");
  };
  const handleSaveChanges = async () => {
    if (userId) {
      try {
        const userRef = doc(firestore, "users", userId);
        await updateDoc(userRef, {
          userMotherName,
          motherAge,
          motherBirthplace,
          motherNationality,
          motherReligion,
          motherEducation,
          motherOccupation,
          fatherName,
          fatherAge,
          fatherBirthplace,
          fatherNationality,
          fatherReligion,
          fatherEducation,
          fatherOccupation,
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
        {/* Father's Profile */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Father&apos;s Profile</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                type="text"
                name="fatherName"
                placeholder="Last Name, First Name, Middle Initial"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="text"
                name="fatherAge"
                placeholder="e.g 40"
                value={fatherAge}
                onChange={(e) => setFatherAge(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birthplace
              </label>
              <Input
                type="text"
                name="fatherBirthplace"
                placeholder="City, Province, Country"
                value={fatherBirthplace}
                onChange={(e) => setFatherBirthplace(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Nationality
              </label>
              <Input
                type="text"
                name="fatherNationality"
                placeholder="e.g. Filipino"
                value={fatherNationality}
                onChange={(e) => setFatherNationality(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Religion</label>
              <Input
                type="text"
                name="fatherReligion"
                placeholder="e.g. Catholic"
                value={fatherReligion}
                onChange={(e) => setFatherReligion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Highest Educational Attainment
              </label>
              <Input
                type="text"
                name="fatherEducation"
                placeholder="e.g. College"
                value={fatherEducation}
                onChange={(e) => setFatherEducation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Occupation
              </label>
              <Input
                type="text"
                name="fatherOccupation"
                placeholder="e.g. Manager"
                value={fatherOccupation}
                onChange={(e) => setFatherOccupation(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Mother's Profile */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Mother&apos;s Profile</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                type="url"
                name="motherName"
                placeholder="Last Name, First Name, Middle Initial"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="text"
                name="motherAge"
                placeholder="e.g. 40"
                value={motherAge}
                onChange={(e) => setMotherAge(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birthplace
              </label>
              <Input
                type="text"
                name="motherBirthplace"
                placeholder="City, Province, Country"
                value={motherBirthplace}
                onChange={(e) => setMotherBirthplace(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Nationality
              </label>
              <Input
                type="text"
                name="motherNationality"
                placeholder="e.g. Filipino"
                value={motherNationality}
                onChange={(e) => setMotherNationality(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Religion</label>
              <Input
                type="text"
                name="motherReligion"
                placeholder="e.g. Catholic"
                value={motherReligion}
                onChange={(e) => setMotherReligion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Highest Educational Attainment
              </label>
              <Input
                type="text"
                name="motherEducation"
                placeholder="e.g. College"
                value={motherEducation}
                onChange={(e) => setMotherEducation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Occupation
              </label>
              <Input
                type="text"
                name="motherOccupation"
                placeholder="e.g. Manager"
                value={motherOccupation}
                onChange={(e) => setMotherOccupation(e.target.value)}
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
      {/* Previous and Next buttons */}
      <div className="flex justify-between mt-8">
        <Button className="px-4 py-2 " onClick={() => handleTabChange("tab1")}>
          Previous
        </Button>
        <Button className="px-4 py-2 " onClick={() => handleTabChange("tab3")}>
          Next
        </Button>
      </div>
    </div>
  );
};
