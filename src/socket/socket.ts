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
  // TEST: 로그인 시 소켓 연결 확인용 로그
  console.log("init", socket);
  return socket;
}

export function getSocket(): Socket {
  if (!socket && cookie.load("token")) return setSocket(cookie.load("token"));
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    // TEST: 소켓 연결 끊어짐 확인용 로그
    console.log("disconnect", socket);
  }
}
