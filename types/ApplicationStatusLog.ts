import { Timestamp } from "firebase/firestore";

export type ApplicationStatusLog = {
    applicationStatusLogId?: string;
    dateEdited: Date | Timestamp;

    applicationId: string;
    oldApplicationStatus: string;
    newApplicationStatus: string;
    
    editorUserId: string;
    editorLastname: string;
    editorFirstname: string;
}