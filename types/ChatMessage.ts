export type ChatMessage = {
    id?: string;
    message: string;
    dateCreated?: Date;
    isRead: boolean;
    isView: boolean;
    sender: {
      userId: string;
      userEmail?: string;
      userFirstName: string;
      userLastName: string;
    };
    recipient: {
      userId: string;
      userEmail?: string;
      userFirstName: string;
      userLastName: string;
    };
  }
  