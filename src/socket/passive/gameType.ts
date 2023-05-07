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
  };
};

export type PlayerData = {
  red: string;
  blue: string;
};

export type SpectatorArray = {
  username: string;
}[];

export type SpectatorData = {
  type: "spectator";
  list: SpectatorArray;
};
