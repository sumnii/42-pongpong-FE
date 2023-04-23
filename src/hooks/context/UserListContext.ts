import { createContext } from "react";
import { UserListArray, BanListArray } from "socket/passive/chatRoomType";

export type UserListSet = {
  participant: UserListArray | null;
  banned: BanListArray | null;
  myOper: string;
};

export const UserListContext = createContext<UserListSet | null>(null);
