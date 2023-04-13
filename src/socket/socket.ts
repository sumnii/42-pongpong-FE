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
  socket.on("error", (data) => {
    console.log(data);
  });
  return socket;
}

export function getSocket(): Socket {
  if (!socket && cookie.load("token")) return setSocket(cookie.load("token"));
  return socket;
}

export function disconnectSocket() {
  socket.disconnect();
  console.log("disconnect", socket);
}
