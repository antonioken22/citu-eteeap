import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { doc, getDoc } from "firebase/firestore";

import { firestore } from "@/firebase/config";
import { UserData } from "@/types/UserData";
import { ApplicantData } from "@/types/ApplicantData";

const useUserState = () => {
  const { user, isLoaded } = useUser(); // Clerk's useUser hook
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userPushNotificationStatus, setUserPushNotificationStatus] =
    useState<boolean>(false);
  const [userBio, setBio] = useState<string | null>(null);
  const [userAge, setAge] = useState<number | null>(null);
  const [userGender, setGender] = useState<string | null>(null);
  const [userNationality, setNationality] = useState<string | null>(null);
  const [userReligion, setReligion] = useState<string | null>(null);
  const [userBirthdate, setBirthdate] = useState<Date | null>(null);
  const [userBirthplace, setBirthplace] = useState<string | null>(null);
  const [userCivilStatus, setCivilStatus] = useState<string | null>(null);
  const [userBirthRank, setBirthRank] = useState<string | null>(null);
  const [userNumBrothers, setNumBrothers] = useState<number | null>(null);
  const [userNumSisters, setNumSisters] = useState<number | null>(null);
  const [userNumCITBrothersSisters, setNumCITBrothersSisters] = useState<
    number | null
  >(null);
  const [userHomeAddress, setHomeAddress] = useState<string | null>(null);
  const [userCityAddress, setCityAddress] = useState<string | null>(null);
  const [userFacebookURL, setFacebookURL] = useState<string | null>(null);
  const [userMobileNumber, setMobileNumber] = useState<string | null>(null);
  const [userMotherName, setMotherName] = useState<string | null>(null);
  const [userMotherAge, setMotherAge] = useState<number | null>(null);
  const [userMotherBirthplace, setMotherBirthplace] = useState<string | null>(
    null
  );
  const [userMotherNationality, setMotherNationality] = useState<string | null>(
    null
  );
  const [userMotherReligion, setMotherReligion] = useState<string | null>(null);
  const [userMotherEducation, setMotherEducation] = useState<string | null>(
    null
  );
  const [userMotherOccupation, setMotherOccupation] = useState<string | null>(
    null
  );
  const [userFatherName, setFatherName] = useState<string | null>(null);
  const [userFatherAge, setFatherAge] = useState<number | null>(null);
  const [userFatherBirthplace, setFatherBirthplace] = useState<string | null>(
    null
  );
  const [userFatherNationality, setFatherNationality] = useState<string | null>(
    null
  );
  const [userFatherReligion, setFatherReligion] = useState<string | null>(null);
  const [userFatherEducation, setFatherEducation] = useState<string | null>(
    null
  );
  const [userFatherOccupation, setFatherOccupation] = useState<string | null>(
    null
  );
  const [userPrevCourse, setPrevCourse] = useState<string | null>(null);
  const [userLastSchool, setLastSchool] = useState<string | null>(null);
  const [userSchoolYear, setSchoolYear] = useState<string | null>(null);
  const [userSchoolType, setSchoolType] = useState<string | null>(null);
  const [userPrevSchoolAddress, setPrevSchoolAddress] = useState<string | null>(
    null
  );
  const [userHsSchoolName, setHsSchoolName] = useState<string | null>(null);
  const [userHsSchoolAddress, setHsSchoolAddress] = useState<string | null>(
    null
  );
  const [userHsYearGraduated, setHsYearGraduated] = useState<string | null>(
    null
  );
  const [userElemSchoolName, setElemSchoolName] = useState<string | null>(null);
  const [userElemSchoolAddress, setElemSchoolAddress] = useState<string | null>(
    null
  );
  const [userElemYearGraduated, setElemYearGraduated] = useState<string | null>(
    null
  );
  const [userProgChoice1, setProgChoice1] = useState<string | null>(null);
  const [userProgChoice2, setProgChoice2] = useState<string | null>(null);
  const [userProgChoice3, setProgChoice3] = useState<string | null>(null);
  const [userContactName, setContactName] = useState<string | null>(null);
  const [userRelation, setRelation] = useState<string | null>(null);
  const [userContactAddress, setContactAddress] = useState<string | null>(null);
  const [userContactNumber, setContactNumber] = useState<string | null>(null);
  const [userFirstQuestion, setFirstQuestion] = useState<string | null>(null);
  const [userSecondQuestion, setSecondQuestion] = useState<string | null>(null);
  const [userThirdQuestion, setThirdQuestion] = useState<string | null>(null);
  const [userFourthQuestion, setFourthQuestion] = useState<string | null>(null);
  const [userFifthQuestion, setFifthQuestion] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      // Ensure Clerk's user is loaded
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(firestore, "users", user.id));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            const applicantData = userDoc.data() as ApplicantData;
            // Store locally
            setUserId(user.id);
            setUserEmail(user.emailAddresses[0]?.emailAddress || null);
            setUserPhotoUrl(user.imageUrl);
            setUserFirstName(userData.firstName);
            setUserLastName(userData.lastName);
            setUserRole(userData.role);
            setUserPushNotificationStatus(userData.pushNotificationStatus);

            // Set additional details
            setBio(userData.bio || null);
            setAge(applicantData.age || null);
            setGender(applicantData.gender || null);
            setNationality(applicantData.nationality || null);
            setReligion(applicantData.religion || null);
            setBirthdate(
              applicantData.birthdate ? new Date(applicantData.birthdate) : null
            );
            setBirthplace(applicantData.birthplace || null);
            setCivilStatus(applicantData.civilStatus || null);
            setBirthRank(applicantData.birthRank || null);
            setNumBrothers(applicantData.numBrothers || null);
            setNumSisters(applicantData.numSisters || null);
            setNumCITBrothersSisters(
              applicantData.numCITBrothersSisters || null
            );
            setHomeAddress(applicantData.homeAddress || null);
            setCityAddress(applicantData.cityAddress || null);
            setFacebookURL(applicantData.facebookURL || null);
            setMobileNumber(applicantData.mobileNumber || null);

            //Parent's Info
            setFatherName(applicantData.fatherName || null);
            setFatherAge(applicantData.fatherAge || null);
            setFatherBirthplace(applicantData.fatherBirthplace || null);
            setFatherNationality(applicantData.fatherNationality || null);
            setFatherReligion(applicantData.fatherReligion || null);
            setFatherEducation(applicantData.fatherEducation || null);
            setFatherOccupation(applicantData.fatherOccupation || null);
            setMotherName(applicantData.motherName || null);
            setMotherAge(applicantData.motherAge || null);
            setMotherBirthplace(applicantData.motherBirthplace || null);
            setMotherNationality(applicantData.motherNationality || null);
            setMotherReligion(applicantData.motherReligion || null);
            setMotherEducation(applicantData.motherEducation || null);
            setMotherOccupation(applicantData.motherOccupation || null);

            //Educational Background
            setPrevCourse(applicantData.prevCourse || null);
            setLastSchool(applicantData.lastSchool || null);
            setSchoolYear(applicantData.schoolYear || null);
            setSchoolType(applicantData.schoolType || null);
            setPrevSchoolAddress(applicantData.prevSchoolAddress || null);
            setHsSchoolName(applicantData.hsSchoolName || null);
            setHsSchoolAddress(applicantData.hsSchoolAddress || null);
            setHsYearGraduated(applicantData.hsYearGraduated || null);
            setElemSchoolName(applicantData.elemSchoolName || null);
            setElemSchoolAddress(applicantData.elemSchoolAddress || null);
            setElemYearGraduated(applicantData.elemYearGraduated || null);
            setProgChoice1(applicantData.progChoice1 || null);
            setProgChoice2(applicantData.progChoice2 || null);
            setProgChoice3(applicantData.progChoice3 || null);

            //Emergency Contact & Essay Admission Test
            setContactName(applicantData.contactName || null);
            setRelation(applicantData.relation || null);
            setContactAddress(applicantData.contactAddress || null);
            setContactNumber(applicantData.contactNumber || null);
            setFirstQuestion(applicantData.firstQuestion || null);
            setSecondQuestion(applicantData.secondQuestion || null);
            setThirdQuestion(applicantData.thirdQuestion || null);
            setFourthQuestion(applicantData.fourthQuestion || null);
            setFifthQuestion(applicantData.fifthQuestion || null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else if (isLoaded && !user) {
      router.push("/sign-in");
      setLoading(false);
    }
  }, [user, isLoaded, router]);

  return {
    userId,
    userEmail,
    userPhotoUrl,
    setUserPhotoUrl,
    userFirstName,
    userLastName,
    userRole,
    userPushNotificationStatus,
    setUserPushNotificationStatus,
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
    userContactName,
    userRelation,
    userContactAddress,
    userContactNumber,
    userFirstQuestion,
    userSecondQuestion,
    userThirdQuestion,
    userFourthQuestion,
    userFifthQuestion,
    loading,
  };
};

export default useUserState;
