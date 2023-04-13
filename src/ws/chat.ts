import { Dispatch, SetStateAction } from "react";
import { getSocket } from "socket/socket";

export type ChatListType = {
  roomId: number;
  status: string;
  title: string;
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

export type MyChatListType = {
  roomId: number;
  title: string;
};

export const updateMyChatRoomList = (
  setState: Dispatch<SetStateAction<MyChatListType[]>>,
): void => {
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
