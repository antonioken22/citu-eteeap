export interface UserData {
  userId: string;
  dateCreated?: Date;
  dateModified?: Date;
  isDeleted?: boolean;
  dateDeleted?: Date;

  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  phoneNumber: string | null;
  role: string;
  pushNotificationStatus: boolean;
  fcmSwToken: string | null;
}
