export type ApplicationStatusLog = {
    applicationStatusLogId?: string;
    applicationId: string;
    oldApplicationStatus: string;
    newApplicationStatus: string;
    dateEdited: Date;
    editorUserId: string;
    editorLastname: string;
    editorFirstname: string;
}