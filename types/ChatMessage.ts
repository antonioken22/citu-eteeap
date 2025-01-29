export type ChatMessage = {
    chatMessageId?: string;
    dateCreated?: Date;

    isView: boolean;
    isRead: boolean;

    message: string;
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
  