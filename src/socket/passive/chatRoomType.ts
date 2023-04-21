export type ChatData = {
  type: "chat";
  roomId: number;
  status: "plain" | "notice";
  from: string;
  content: string;
};

export type HistoryData = {
  type: "history";
  list: HistoryArray;
};

export type HistoryArray = {
  from: string;
  content: string;
}[];

export type ChatRoomData = {
  type: "chatRoom";
  roomId: number;
  userList: UserListArray;
  banList: BanListArray;
};

export type UserListArray = {
  username: string;
  owner: boolean;
  admin: boolean;
  muted: boolean;
  login: boolean;
}[];

export type BanListArray = {
  username: string;
}[];
