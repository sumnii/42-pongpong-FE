import { useNavigate } from "react-router-dom";
import { exitChatRoom } from "ws/chat";

export default function Exit(props: { room: number }) {
  const navigate = useNavigate();
  function exitHandler() {
    exitChatRoom(props.room, navigate);
  }
  return (
    <button onClick={exitHandler}>나가기</button>
  );
}