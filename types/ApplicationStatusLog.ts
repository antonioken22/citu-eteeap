import { Timestamp } from "firebase/firestore";

export type ApplicationStatusLog = {
    applicationStatusLogId?: string;
    applicationId: string;
    oldApplicationStatus: string;
    newApplicationStatus: string;
    dateEdited: Date | Timestamp;
    editorUserId: string;
    editorLastname: string;
    editorFirstname: string;
}