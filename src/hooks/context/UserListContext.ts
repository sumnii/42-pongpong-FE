import { createContext } from "react";
import { UserListArray, BanListArray } from "socket/passive/chatRoomType";

export type ChatUserListSet = {
  participant: UserListArray | null;
  banned: BanListArray | null;
  blocked: BanListArray | null;
  myOper: string;
};

export type GameUserListSet = {
  players: {
    red: string;
    blue: string;
  };
  spectators: string[];
};

export const UserListContext = createContext<ChatUserListSet | GameUserListSet | null>(null);
