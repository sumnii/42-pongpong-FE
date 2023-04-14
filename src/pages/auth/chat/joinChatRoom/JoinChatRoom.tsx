import { useNavigate } from 'react-router-dom'
import { getSocket } from 'socket/socket';
import * as S from './style'

interface dataType {
  status: string,
  detail: string
};

export default function JoinChatRoom(props: { no: string | number }) {
  const navigate = useNavigate();

  function joinHandler() {
    const socket = getSocket();
    if (socket) {
      socket.emit('joinChatRoom', {
        "roomId": props.no,
      });
      socket.on('joinChatRoomResult', data => {
        const res: dataType = data;
        if (res.status === 'approved')
          navigate(`/chat/${props.no}`);
        else
          alert(res.detail);
      })
    }
  }
  return (
    <S.EntryBtn onClick={joinHandler}>
      참가
    </S.EntryBtn>
  )
}