import React, { createContext } from "react";

type ChatRoomContextType = ChatInfoType[];
export const ChatRoomContext = createContext<ChatRoomContextType | null>(null);

export type ChatInfoType = {
  roomId: number;
  status: string;
  title: string;
};

export type MyChatInfoType = {
  roomId: number;
  title: string;
};

let chatRoom: ChatInfoType[];

// export function setChatRoom(props: ChatInfoType[]) {

// }
