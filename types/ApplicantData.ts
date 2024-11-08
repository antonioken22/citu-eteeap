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

// TAB 1: General Information 
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

// TAB 2: Family Background
    fatherName: string;
    fatherAge: number;
    fatherBirthplace: string;
    fatherNationality: string;
    fatherReligion: string;
    fatherEducation: string;
    fatherOccupation: string;
    
    motherName: string;
    motherAge: number;
    motherBirthplace: string;
    motherNationality: string;
    motherReligion: string;
    motherEducation: string;
    motherOccupation: string;

// TAB 3: Educational Background
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

// TAB 4: Requirement Documents
  // Pre-evaluation Requirements
      evalSheet: string | null; // file url
      jobDescription: string | null; // file url
  // Other Requirements
      tor: string | null; // file url
      hsForm: string | null; // file url
      psaBirthCert: string | null; // file url
      transferCred: string | null; // file url
      marriageCert: string | null; // file url
      employmentCert: string | null; // file url
      businessProof: string | null; // file url
  // Undertaking/Waiver
      applicantType: string;
      missingDocs: string[];
      photoWithID: string | null; // file url

// TAB 5: Emergency Contact & Essay Admission Test
  // Emergency Contact   
      contactName: string;
      relation: string;
      contactAddress: string;
      contactNumber: string;
  // Essay Admission Test
      examSet: string;
    // Questions
        firstQuestion: string;
        secondQuestion: string;
        thirdQuestion: string;
        fourthQuestion: string;
        fifthQuestion: string;
};
