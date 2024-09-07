export interface UserData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  role: string;
  pushNotificationStatus: boolean;
  fcmSwToken: string | null;
}
