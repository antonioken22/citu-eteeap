import { Timestamp } from "firebase/firestore";

export interface UserData {
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
  bio: string | null;
  role: string;
  pushNotificationStatus: boolean;
  fcmSwToken: string | null;
}
