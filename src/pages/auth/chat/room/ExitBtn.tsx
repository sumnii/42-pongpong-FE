import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoomResponse } from "socket/active/chatEventType";
import { getSocket } from "socket/socket";
import * as S from "./style";

export default function ExitBtn(props: { room: number }) {
  const navigate = useNavigate();
  const socket = getSocket();

  const listener = (res: ChatRoomResponse) => {
    if (res.roomId === props.room) {
      if (res.status === "approved") {
        navigate("/chat/list");
      } else if (res.status === "error") {
        console.log(res);
        if (res.detail === "해당 채팅방의 유저가 아닙니다.") {
          alert("해당 채팅방에 참여 중이지 않습니다.");
          navigate("/chat/list");
        }
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
  return <S.ExitBtn onClick={exitHandler}>퇴장</S.ExitBtn>;
}
