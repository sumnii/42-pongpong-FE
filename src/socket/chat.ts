
export type ChatListType = {
  owner: string;
  roomId: number;
  status: string;
  title: string;
  joining: number;
};

export type emitChatType = {
  status: "error" | "warning" | "approved";
  detail: string;
};

export type ChatEvntType = {
  roomId: number;
  status: "plain" | "notice";
  from: string;
  content: string;
};

export type JoinEvntType = {
  status: string;
  detail: string;
  roomId: number;
};

export type CreateEvntType = {
  status: string;
  detail: string;
  roomId: number;
};

export type exitEvntType = {
  status: "error" | "approved";
  detail: string;
  roomId: number;
};

export type ChatUserListType = {
  roomId: number;
  userList: [
    {
      username: string;
      owner: boolean;
      admin: boolean;
      login: boolean;
    },
  ];
  banList: [
    {
      username: string;
    },
  ];
};
