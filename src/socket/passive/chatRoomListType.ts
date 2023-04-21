export type ChatRoomListData = {
  type: string;
  list: ChatListArray;
};

export type ChatListArray = {
  owner: string;
  roomId: number;
  status: string;
  title: string;
  joining: number;
}[];
