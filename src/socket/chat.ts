import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { getSocket } from "socket/socket";

export type ChatListType = {
  owner: string;
  roomId: number;
  status: string;
  title: string;
  joining: number;
};

export type emitChatType = {
  status: "error" | "warning" | "approved";
  detail: string;
};

export type ChatEvntType = {
  roomId: number;
  status: "plain" | "notice";
  from: string;
  content: string;
};

export type JoinEvntType = {
  status: string;
  detail: string;
  roomId: number;
};

export type CreateEvntType = {
  status: string;
  detail: string;
  roomId: number;
};

export type exitEvntType = {
  status: "error" | "approved";
  detail: string;
  roomId: number;
};

export type ChatUserListType = {
  roomId: number;
  userList: [
    {
      username: string;
      owner: boolean;
      admin: boolean;
      login: boolean;
    },
  ];
  banList: [
    {
      username: string;
    },
  ];
};

export const joinPasswdChatRoom = (
  room: number | undefined,
  pass: string,
  navigate: NavigateFunction,
  setState: Dispatch<SetStateAction<string>>,
  setClose: () => void,
): void => {
  const socket = getSocket();
  if (socket) {
    socket.emit("joinChatRoom", {
      roomId: room,
      password: pass,
    });
    socket.on("joinChatRoomResult", (data) => {
      const res: JoinEvntType = data;
      console.log(res);
      if (res.roomId === room) {
        if (res.status === "approved") {
          navigate(`/chat/${room}`);
          setClose();
        } else if (res.status === "warning") {
          setState(res.detail);
        } else if (res.status === "error") {
          console.log(res.detail);
        }
      }
    });
  }
};
