import { useNavigate } from "react-router-dom";
import { exitChatRoom } from "socket/chat";

export default function ExitBtn(props: { room: number }) {
  const navigate = useNavigate();
  function exitHandler() {
    exitChatRoom(props.room, navigate);
  }
  return (
    <button onClick={exitHandler}>나가기</button>
  );
}