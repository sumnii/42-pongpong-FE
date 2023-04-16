import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exitChatRoom, exitEvntType } from "socket/chat";
import { getSocket } from "socket/socket";

export default function ExitBtn(props: { room: number }) {
  const navigate = useNavigate();
  const socket = getSocket();

  const listner = (res: exitEvntType) => {
    console.log(res);
    if (res.roomId === props.room) {
      if (res.status === "approved") {
        navigate("/chat/list");
      } else if (res.status === "error") {
        console.log(res.detail);
      }
    }
  };
  useEffect(() => {
    socket.on("exitChatRoomResult", listner);
    return () => {
      socket.off("exitChatRoomResult", listner);
    };
  });

  function exitHandler() {
    socket.emit("exitChatRoom", {
      roomId: props.room,
    });
  }
  return <button onClick={exitHandler}>나가기</button>;
}
