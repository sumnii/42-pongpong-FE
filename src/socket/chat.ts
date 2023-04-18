export type ChatRoomListType = {
  type : string;
  list : ChatListType[];
}

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
  type: string;
  roomId: number;
  status: "plain" | "notice";
  from: string;
  content: string;
};

export type JoinEvntType = {
  type: string;
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
  type: string
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
