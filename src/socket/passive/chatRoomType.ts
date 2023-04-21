export type ChatData = {
  type: "chat";
  roomId: number;
  status: "plain" | "notice";
  from: string;
  content: string;
};

export type HistoryData = {
  type: "history";
  roomId: number;
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

export type AffectedData = {
  type: "ban" | "mute" | "kick";
  roomId: number;
  from: string;
};
