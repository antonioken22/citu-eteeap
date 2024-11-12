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

export const Tab3 = ({ handleTabChange }: any) => {
  const {
    userId,
    userPrevCourse,
    userLastSchool,
    userSchoolYear,
    userSchoolType,
    userPrevSchoolAddress,
    userHsSchoolName,
    userHsSchoolAddress,
    userHsYearGraduated,
    userElemSchoolName,
    userElemSchoolAddress,
    userElemYearGraduated,
    userProgChoice1,
    userProgChoice2,
    userProgChoice3,
  } = useUserState();
  const [prevCourse, setPrevCourse] = useState(userPrevCourse || "");
  const [lastSchool, setLastSchool] = useState(userLastSchool || "");
  const [schoolYear, setSchoolYear] = useState(userSchoolYear || "");
  const [schoolType, setSchoolType] = useState(userSchoolType || "");
  const [prevSchoolAddress, setPrevSchoolAddress] = useState(
    userPrevSchoolAddress || ""
  );
  const [hsSchoolName, setHsSchoolName] = useState(userHsSchoolName || "");
  const [hsSchoolAddress, setHsSchoolAddress] = useState(
    userHsSchoolAddress || ""
  );
  const [hsYearGraduated, setHsYearGraduated] = useState(
    userHsYearGraduated || ""
  );
  const [elemSchoolName, setElemSchoolName] = useState(
    userElemSchoolName || ""
  );
  const [elemSchoolAddress, setElemSchoolAddress] = useState(
    userElemSchoolAddress || ""
  );
  const [elemYearGraduated, setElemYearGraduated] = useState(
    userElemYearGraduated || ""
  );
  const [progChoice1, setProgChoice1] = useState(userProgChoice1 || "");
  const [progChoice2, setProgChoice2] = useState(userProgChoice2 || "");
  const [progChoice3, setProgChoice3] = useState(userProgChoice3 || "");

  useEffect(() => {
    if (userId) {
      setPrevCourse(userPrevCourse || "");
      setLastSchool(userLastSchool || "");
      setSchoolYear(userSchoolYear || "");
      setSchoolType(userSchoolType || "");
      setPrevSchoolAddress(userPrevSchoolAddress || "");
      setHsSchoolName(userHsSchoolName || "");
      setHsSchoolAddress(userHsSchoolAddress || "");
      setHsYearGraduated(userHsYearGraduated || "");
      setElemSchoolName(userElemSchoolName || "");
      setElemSchoolAddress(userElemSchoolAddress || "");
      setElemYearGraduated(userElemYearGraduated || "");
      setProgChoice1(userProgChoice1 || "");
      setProgChoice2(userProgChoice2 || "");
      setProgChoice3(userProgChoice3 || "");
    }
  }, [
    userId,
    userPrevCourse,
    userLastSchool,
    userSchoolYear,
    userSchoolType,
    userPrevSchoolAddress,
    userHsSchoolName,
    userHsSchoolAddress,
    userHsYearGraduated,
    userElemSchoolName,
    userElemSchoolAddress,
    userElemYearGraduated,
    userProgChoice1,
    userProgChoice2,
    userProgChoice3,
  ]);

  const handleCancelChanges = () => {
    setPrevCourse(userPrevCourse || "");
    setLastSchool(userLastSchool || "");
    setSchoolYear(userSchoolYear || "");
    setSchoolType(userSchoolType || "");
    setPrevSchoolAddress(userPrevSchoolAddress || "");
    setHsSchoolName(userHsSchoolName || "");
    setHsSchoolAddress(userHsSchoolAddress || "");
    setHsYearGraduated(userHsYearGraduated || "");
    setElemSchoolName(userElemSchoolName || "");
    setElemSchoolAddress(userElemSchoolAddress || "");
    setElemYearGraduated(userElemYearGraduated || "");
    setProgChoice1(userProgChoice1 || "");
    setProgChoice2(userProgChoice2 || "");
    setProgChoice3(userProgChoice3 || "");
  };
  const handleSaveChanges = async () => {
    if (userId) {
      try {
        const userRef = doc(firestore, "users", userId);
        await updateDoc(userRef, {
          userPrevCourse,
          lastSchool,
          schoolYear,
          schoolType,
          prevSchoolAddress,
          hsSchoolName,
          hsSchoolAddress,
          hsYearGraduated,
          elemSchoolName,
          elemSchoolAddress,
          elemYearGraduated,
          progChoice1,
          progChoice2,
          progChoice3,
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
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">School Attended</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Previous Course (if Transferee/College Graduate)
            </label>
            <Input
              type="text"
              name="prevCourse"
              placeholder="e.g. BS Computer Engineering"
              value={prevCourse}
              onChange={(e) => setPrevCourse(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Last School Attended
            </label>
            <Input
              type="text"
              name="lastSchool"
              placeholder="e.g. Cebu Institute of Technology University"
              value={lastSchool}
              onChange={(e) => setLastSchool(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Previous School Address
            </label>
            <Input
              type="text"
              name="prevSchoolAddress"
              placeholder="e.g Natalio B. Bacalso Ave, Cebu City, 6000 Cebu"
              value={prevSchoolAddress}
              onChange={(e) => setPrevSchoolAddress(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                School Year
              </label>
              <Input
                type="text"
                name="schoolYear"
                placeholder="e.g. 2020"
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                School Type
              </label>
              <Input
                type="text"
                name="schoolType"
                placeholder="e.g. Public"
                value={schoolType}
                onChange={(e) => setSchoolType(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row gap-6">
        {/* High School */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">High School</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Complete Name of School
              </label>
              <Input
                type="text"
                name="hsSchoolName"
                placeholder="e.g. Cebu Institute of Technology University"
                value={hsSchoolName}
                onChange={(e) => setHsSchoolName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                School Address
              </label>
              <Input
                type="text"
                name="hsSchoolAddress"
                placeholder="e.g Natalio B. Bacalso Ave, Cebu City, 6000 Cebu"
                value={hsSchoolAddress}
                onChange={(e) => setHsSchoolAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Year Graduated
              </label>
              <Input
                type="text"
                name="hsYearGraduated"
                placeholder="e.g. 2020"
                value={hsYearGraduated}
                onChange={(e) => setHsYearGraduated(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Elementary */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Elementary</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Complete Name of School
              </label>
              <Input
                type="url"
                name="elemSchoolName"
                placeholder="e.g. Cebu Institute of Technology University"
                value={elemSchoolName}
                onChange={(e) => setElemSchoolName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                School Address
              </label>
              <Input
                type="text"
                name="elemSchoolAddress"
                placeholder="e.g Natalio B. Bacalso Ave, Cebu City, 6000 Cebu"
                value={elemSchoolAddress}
                onChange={(e) => setElemSchoolAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Year Graduated
              </label>
              <Input
                type="text"
                name="elemYearGraduated"
                placeholder="e.g. 2020"
                value={elemYearGraduated}
                onChange={(e) => setElemYearGraduated(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">
            Program Preffered to Enroll in CIT University
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Progam Choice 1
            </label>
            <Input
              type="text"
              name="progChoice1"
              placeholder="e.g. BS Computer Engineering"
              value={progChoice1}
              onChange={(e) => setProgChoice1(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Progam Choice 2
            </label>
            <Input
              type="text"
              name="progChoice2"
              placeholder="e.g. Bachelor in Public Administration"
              value={progChoice2}
              onChange={(e) => setProgChoice2(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Progam Choice 3
            </label>
            <Input
              type="text"
              name="progChoice3"
              placeholder="e.g. BS Elementary Education Major in General Education"
              value={progChoice3}
              onChange={(e) => setProgChoice3(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
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
