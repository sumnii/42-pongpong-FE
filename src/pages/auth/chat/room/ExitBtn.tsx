import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEventResult } from "socket/chat";
import { getSocket } from "socket/socket";

export default function ExitBtn(props: { room: number }) {
  const navigate = useNavigate();
  const socket = getSocket();

  const listener = (res: ChatEventResult) => {
    if (res.roomId === props.room) {
      if (res.status === "approved") {
        navigate("/chat/list");
      } else if (res.status === "error") {
        console.log(res.detail); // 개발자가 알아야하는 error
      }
    }
  };
  useEffect(() => {
    socket.on("exitChatRoomResult", listener);
    return () => {
      socket.off("exitChatRoomResult", listener);
    };
  }, []);

  function exitHandler() {
    socket.emit("exitChatRoom", {
      roomId: props.room,
    });
  }
  return <button onClick={exitHandler}>나가기</button>;
}
