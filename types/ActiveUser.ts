export type ActiveUser = {
  activeUsersLogId?: string;

  time: string;
  count: number;

  users: Array<{
    userId: string;
    userEmail: string;
    userFirstName: string;
    userLastName: string;
  }>;
};
