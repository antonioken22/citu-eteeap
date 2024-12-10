import { Timestamp } from "firebase/firestore";

export type UserData = {
  id: string; 
  userId: string;
  dateCreated?: Date | Timestamp;
  dateModified?: Date | Timestamp;
  isDeleted?: boolean;
  dateDeleted?: Date | Timestamp;

  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  phoneNumber: string | null;
  role: string;
  pushNotificationStatus: boolean;
  fcmSwToken: string | null;
}
