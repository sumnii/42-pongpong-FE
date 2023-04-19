import io, { Socket } from "socket.io-client";
import cookie from "react-cookies";

export type socketType = Socket;
let socket: Socket;

export function setSocket(token: string): Socket {
  socket = io("ws://localhost:81", {
    extraHeaders: {
      Authorization: "Bearer " + token,
    },
  });
  // 로그인 시 소켓 연결 확인용 로그
  console.log("init", socket);

  // socket.emit("subscribe", { // 새로고침을 고려한다면 이 위치에 있어야함
  //   type: "chatRoomList",
  // });
  return socket;
}

export function getSocket(): Socket {
  if (!socket && cookie.load("token")) return setSocket(cookie.load("token"));
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    console.log("disconnect", socket);
  }
}
