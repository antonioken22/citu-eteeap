export type ApplicantData = {
  activeEmail: string;
  lastName: string;
  firstName: string;
  age: number;
  gender: string;
  nationality: string;
  religion: string;
  birthdate: string;
  birthplace: string;
  civilStatus: string;
  birthRank: string;
  numBrothers: number;
  numSisters: number;
  numCITBrothersSisters: number;
  homeAddress: string;
  cityAddress: string;
  facebookURL: string;
  mobileNumber: string;
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
  prevCourse: string;
  lastSchool: string;
  schoolYear: string;
  schoolType: string;
  prevSchoolAddress: string;
  hsSchoolName: string;
  hsSchoolAddress: string;
  hsYearGraduated: string;
  elemSchoolName: string;
  elemSchoolAddress: string;
  elemYearGraduated: string;
  progChoice1: string;
  progChoice2: string;
  progChoice3: string;
  contactName: string;
  relation: string;
  contactAddress: string;
  contactNumber: string;
  evalSheet: string | null; // file url
  jobDescription: string | null; // file url
  tor: string | null; // file url
  hsForm: string | null; // file url
  transferCred: string | null; // file url
  marriageCert: string | null; // file url
  employmentCert: string | null; // file url
  businessProof: string | null; // file url
  applicantType: string;
  missingDocs: string;
  photoWithID: string | null; // file url
  examSet: string;
  firstQuestion: string;
  secondQuestion: string;
  thirdQuestion: string;
  fourthQuestion: string;
  fifthQuestion: string;
};
