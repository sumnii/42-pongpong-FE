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
    setState(tmp);
  });
  socket.on("error", (data) => {
    console.log(data);
  });
};

export const updateMyChatRoomList = (setState: Dispatch<SetStateAction<ChatListType[]>>): void => {
  const socket = getSocket();
  if (socket) {
    socket.on("updateMyChatRoomList", (data: []) => {
      setState(data);
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
  roomId: number;
};

export const joinChatRoom = (
  room: number | undefined,
  navigate: NavigateFunction,
  setRoom: Dispatch<SetStateAction<number | undefined>>,
): void => {
  const socket = getSocket();
  if (socket) {
    socket.emit("joinChatRoom", {
      roomId: room,
    });
    socket.on("joinChatRoomResult", (data) => {
      const res: JoinEvntType = data;
      console.log(data);
      if (res.status === "approved") {
        setRoom(() => res.roomId);
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
  room: number | undefined,
  pass: string,
  navigate: NavigateFunction,
  setState: Dispatch<SetStateAction<string>>,
  setClose: () => void,
  setRoom: Dispatch<SetStateAction<number | undefined>>,
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
        setRoom(() => res.roomId);
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

type CreateEvntType = {
  status: string;
  detail: string;
  roomId: number;
};

export const createChatRoom = (
  statusInput: string,
  titleInput: string,
  pwInput: string,
  setNotice: Dispatch<SetStateAction<string>>,
  closeModal: () => void,
  navigate: NavigateFunction,
  setRoom: Dispatch<SetStateAction<number | undefined>>,
): void => {
  const socket = getSocket();
  if (socket) {
    if (pwInput) {
      socket.emit("createChatRoom", {
        status: statusInput,
        title: titleInput,
        password: pwInput,
      });
    } else {
      socket.emit("createChatRoom", {
        status: statusInput,
        title: titleInput,
      });
    }
    socket.on("createChatRoomResult", (data) => {
      const res: CreateEvntType = data;
      if (res.status === "approved") {
        closeModal();
        if (statusInput !== "protected") {
          joinChatRoom(res.roomId, navigate, setRoom);
        } else {
          joinPasswdChatRoom(res.roomId, pwInput, navigate, setNotice, closeModal, setRoom);
        }
      } else if (res.status === "warning") {
        setNotice(res.detail);
      } else if (res.status === "error") {
        console.log(data);
      }
    });
  }
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

export const updateChatRoom = (
  room: number | undefined,
  setState: Dispatch<SetStateAction<ChatUserListType | null>>,
): void => {
  const socket = getSocket();
  if (socket) {
    // socket.emit("updateChatRoom", {
    //   roomId: room, /// 서버에 roomId에 대한 updateChatRoom 으로 요청하기
    // });
    socket.on("updateChatRoom", (data) => {
      const res: ChatUserListType = data;
      console.log("updateChatRoom", data, room);
      if (res.roomId === room) {
        console.log("----------updateChatRoom---------", data, room);
        setState(res);
      }
    });
  }
};

type exitEvntType = {
  status: "error" | "approved";
  detail: string;
};

export const exitChatRoom = (room: number, navigate: NavigateFunction) => {
  const socket = getSocket();
  if (socket) {
    socket.emit("exitChatRoom", {
      roomId: room,
    });
    socket.on("exitChatRoomResult", (data) => {
      const res: exitEvntType = data;
      if (res.status === "approved") navigate("/chat/list");
      else if (res.status === "error") console.log(res.detail);
    });
  }
};
