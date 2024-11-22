import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/config";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

export const Tab5 = ({ handleTabChange }: any) => {
  const {
    userId,
    userContactName,
    userRelation,
    userContactAddress,
    userContactNumber,
    userFirstQuestion,
    userSecondQuestion,
    userThirdQuestion,
    userFourthQuestion,
    userFifthQuestion,
  } = useUserState();
  const [emergencyContactName, setContactName] = useState(
    userContactName || ""
  );
  const [emergencyContactNumber, setContactNumber] = useState(
    userContactNumber || ""
  );
  const [emergencyContactRelationship, setRelation] = useState(
    userRelation || ""
  );
  const [emergencyContactAddress, setContactAddress] = useState(
    userContactAddress || ""
  );
  const [firstQuestionAnswer, setFirstQuestion] = useState(
    userFirstQuestion || ""
  );
  const [secondQuestionAnswer, setSecondQuestion] = useState(
    userSecondQuestion || ""
  );
  const [thirdQuestionAnswer, setThirdQuestion] = useState(
    userThirdQuestion || ""
  );
  const [fourthQuestionAnswer, setFourthQuestion] = useState(
    userFourthQuestion || ""
  );
  const [fifthQuestionAnswer, setFifthQuestion] = useState(
    userFifthQuestion || ""
  );

  useEffect(() => {
    if (userId) {
      setContactName(userContactName || "");
      setContactNumber(userContactNumber || "");
      setRelation(userRelation || "");
      setContactAddress(userContactAddress || "");
      setFirstQuestion(userFirstQuestion || "");
      setSecondQuestion(userSecondQuestion || "");
      setThirdQuestion(userThirdQuestion || "");
      setFourthQuestion(userFourthQuestion || "");
      setFifthQuestion(userFifthQuestion || "");
    }
  }, [
    userId,
    userContactName,
    userRelation,
    userContactAddress,
    userContactNumber,
    userFirstQuestion,
    userSecondQuestion,
    userThirdQuestion,
    userFourthQuestion,
    userFifthQuestion,
  ]);

  const handleCancelChanges = () => {
    setContactName(userContactName || "");
    setContactNumber(userContactNumber || "");
    setRelation(userRelation || "");
    setContactAddress(userContactAddress || "");
    setFirstQuestion(userFirstQuestion || "");
    setSecondQuestion(userSecondQuestion || "");
    setThirdQuestion(userThirdQuestion || "");
    setFourthQuestion(userFourthQuestion || "");
    setFifthQuestion(userFifthQuestion || "");
  };
  const handleSaveChanges = async () => {
    if (userId) {
      try {
        const userRef = doc(firestore, "users", userId);
        await updateDoc(userRef, {
          emergencyContactName,
          emergencyContactRelationship,
          emergencyContactAddress,
          emergencyContactNumber,
          firstQuestionAnswer,
          secondQuestionAnswer,
          thirdQuestionAnswer,
          fourthQuestionAnswer,
          fifthQuestionAnswer,
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
          <h2 className="text-xl font-semibold">Emergency Contact</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Name
              </label>
              <Input
                type="text"
                name="emergencyContactName"
                placeholder="e.g. Juan Dela Cruz"
                value={emergencyContactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number
              </label>
              <Input
                type="text"
                name="emergencyContactNumber"
                placeholder="e.g. 09296901573"
                value={emergencyContactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Relation</label>
              <Input
                type="text"
                name="emergencyContactRelationship"
                placeholder="e.g. Father"
                value={emergencyContactRelationship}
                onChange={(e) => setRelation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input
                type="text"
                name="emergencyContactAddress"
                placeholder="e.g. 2Wilson Place, Wilson Street, Lahug"
                value={emergencyContactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">
            Essay Admission Test Answers
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question 1</label>
            <Textarea name="firstQuestionAnswer" value={firstQuestionAnswer} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Question 2</label>
            <Textarea
              name="secondQuestionAnswer"
              value={secondQuestionAnswer}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Question 3</label>
            <Textarea name="thirdQuestionAnswer" value={thirdQuestionAnswer} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Question 4</label>
            <Textarea
              name="fourthQuestionAnswer"
              value={fourthQuestionAnswer}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Question 5</label>
            <Textarea name="fifthQuestionAnswer" value={fifthQuestionAnswer} />
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
    </div>
  );
};
