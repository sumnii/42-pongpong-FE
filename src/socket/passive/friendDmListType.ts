/*
 *          DM
 */

export type DmListArray = {
  username: string;
}[];

export type DmList = {
  type: "dmList";
  list: DmListArray;
};

export interface DmData {
  from: string;
  content: string;
}

export interface DmResponse extends DmData {
  type: "dm";
}

export type DmHistoryData = {
  type: "history";
  list: DmData[];
};

/*
 *          Friend
 */

export type FriendListArray = {
  username: string;
  status: string;
}[];

export type FriendList = {
  type: "friend";
  list: FriendListArray;
};
