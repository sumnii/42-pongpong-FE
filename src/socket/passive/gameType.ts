export type GameRoomListArray = {
  roomId: number;
  rule: string;
  red: string;
  blue: string;
}[];

export type GameRoomListData = {
  type: "gameRoomList";
  list: GameRoomListArray;
};
