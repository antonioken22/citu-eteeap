export type ApplicantData = {
  applicationId?: string; // Firestore - auto generated 
  dateCreated?: Date;

  isDeleted: boolean;
  dateDeleted?: Date;

  isSubmitted: boolean;
  dateSubmitted?: Date;
  applicationStatus: string;

  isEdited: boolean;
  isApplicationStatusEdited: boolean;
  isQuestionReadAndUnderstood: boolean,
  isPrivacyNoticeAccepted: boolean;
  isWaiverAccepted: boolean;

// SECTION 1: Personal Information 
  // Personal
      applicantId: string;
      activeEmail: string;
      lastName: string;
      firstName: string;
      age: number;
      gender: string;
      nationality: string;
      religion: string;
      birthdate: Date;
      birthplace: string;
      civilStatus: string;
  // Family
      birthRank: string;
      numBrothers: number;
      numSisters: number;
      numCITBrothersSisters: number;
  // Address
      homeAddress: string;
      cityAddress: string;
  // Social
      facebookURL: string;
      mobileNumber: string;

// SECTION 2: Parents Profile & Emergency Contact
    // Father's Profile
    fatherName: string;
    fatherAge: number;
    fatherBirthplace: string;
    fatherNationality: string;
    fatherReligion: string;
    fatherEducation: string;
    fatherOccupation: string;
    // Mother's Profile
    motherName: string;
    motherAge: number;
    motherBirthplace: string;
    motherNationality: string;
    motherReligion: string;
    motherEducation: string;
    motherOccupation: string;
    // Emergency Contact   
    emergencyContactName: string;
    emergencyContactRelationship: string;
    emergencyContactAddress: string;
    emergencyContactNumber: string;

// SECTION 3: Educational Background
      educationalAttainment: string;
  // Previous Education
      prevCourse: string;
      lastSchool: string;
      schoolYear: string;
      schoolType: string;
      prevSchoolAddress: string;
  // High School
      hsSchoolName: string;
      hsSchoolAddress: string;
      hsYearGraduated: string;
  // Elementary 
      elemSchoolName: string;
      elemSchoolAddress: string;
      elemYearGraduated: string;

  // Program Choices
      progChoice1: string;
      progChoice2: string;
      progChoice3: string;

// SECTION 4: Requirement Documents
      applicantType: string;
  // Pre-evaluation Requirements
      evalSheet: string | null; // file url
      jobDescription: string | null; // file url
  // Other Requirements
      tor: string | null; // file url
      hsForm137A: string | null; // file url
      hsForm138: string | null; // file url
      psaBirthCert: string | null; // file url
      transferCred: string | null; // file url
      marriageCert: string | null; // file url
      employmentCert: string | null; // file url
      businessProof: string | null; // file url
  // Undertaking/Waiver
      missingDocs: string[];
      photoWithValidId: string | null; // file url

// SECTION 5: Essay Admission Test
      examSet: string;
    // Answers
        firstQuestionAnswer: string;
        secondQuestionAnswer: string;
        thirdQuestionAnswer: string;
        fourthQuestionAnswer: string;
        fifthQuestionAnswer: string;
};
