export type DmListArray = {
  username: string;
}[];

export type DmList = {
  type: "dmList";
  list: DmListArray;
};

export type FriendListArray = {
  username: string;
  status: string;
}[];

export type FriendList = {
  type: "friend";
  list: FriendListArray;
};
