import { useNavigate } from "react-router-dom";
import { getSocket } from "socket/socket";

interface dataType {
  status: 'error' | 'approved'
  detail: string
}

export default function Exit(props: { room: number }) {
  const navigate = useNavigate();
  function exitHandler() {
    const socket = getSocket();
    if (socket) {
      socket.emit('exitChatRoom', {
        "roomId": props.room
      });
      socket.on('exitChatRoomResult', (data) => {
        const res: dataType = data;
        if (res.status === 'approved')
          navigate('/chat/list');
        console.log(data);
      })
    }
  }
  return (
    <button onClick={exitHandler}>나가기</button>
  );
}