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

export type GameRoomData = {
  type: "game";
  status: {
    redUser: string;
    blueUser: string;
    spectator: string[];
  };
};

export type PlayerData = {
  red: string;
  blue: string;
};
