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

export const updateChatRoomList = (setState: Dispatch<SetStateAction<ChatListType[]>>): void => {
  const socket = getSocket();
  let tmp: ChatListType[] = [];
  socket.on("updateChatRoomList", (data: []) => {
    data.map((elem: ChatListType) => {
      if (elem.status !== "private") {
        tmp.push(elem);
      }
    });
    setState([...tmp]);
  });
  socket.on("error", (data) => {
    console.log(data);
  });
};

export const updateMyChatRoomList = (setState: Dispatch<SetStateAction<ChatListType[]>>): void => {
  const socket = getSocket();
  if (socket) {
    socket.on("updateMyChatRoomList", (data: []) => {
      setState([...data]);
    });
  }
  socket.on("error", (data) => {
    console.log(data);
  });
};

export type emitChatType = {
  status: "error" | "warning" | "approved";
  detail: string;
};

export const emitChat = (
  id: string | number,
  state: string,
  setState: Dispatch<SetStateAction<string>>,
): void => {
  const socket = getSocket();
  if (socket) {
    socket.emit("chat", {
      roomId: id,
      content: state,
    });
    setState("");
    socket.on("chatResult", (data) => {
      const res: emitChatType = data;
      console.log(res);
      if (res.status === "warning") {
        alert(res.detail);
      }
    });
  }
};

export type ChatEvntType = {
  status: "plain" | "notice";
  from: string;
  content: string;
};

export const onChat = (
  state: ChatEvntType[],
  setState: Dispatch<SetStateAction<ChatEvntType[]>>,
): void => {
  const socket = getSocket();
  if (socket) {
    socket.on("chat", (data) => {
      const res: ChatEvntType = data;
      setState([...state, res]);
    });
  }
};

type JoinEvntType = {
  status: string;
  detail: string;
};

export const joinChatRoom = (room: string | number, navigate: NavigateFunction): void => {
  const socket = getSocket();
  if (socket) {
    socket.emit("joinChatRoom", {
      roomId: room,
    });
    socket.on("joinChatRoomResult", (data) => {
      const res: JoinEvntType = data;
      if (res.status === "approved") {
        navigate(`/chat/${room}`);
      } else if (res.status === "warning") {
        alert(res.detail);
      } else if (res.status === "error") {
        console.log(res.detail);
      }
    });
  }
};

export const joinPasswdChatRoom = (
  room: string | number,
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
      if (res.status === "approved") {
        navigate(`/chat/${room}`);
        setClose();
      } else if (res.status === "warning") {
        setState(res.detail);
      } else if (res.status === "error") {
        console.log(res.detail);
      }
    });
  }
};
