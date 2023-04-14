import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import { useEffect } from "react";
import * as S from "./style";
import Send from "./Send";
import ChatScreen from "./ChatScreen";
import Exit from "./Exit";

export default function ChatRoom(props: { setPage: (page: "chat") => void }) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) navigate("/");
    props.setPage("chat");
  });

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>{roomId}번 채팅방 입장완료</S.H2>
        <Exit room={Number(roomId)} />
      </S.HeaderBox>
      <ChatScreen />
      <Send room={Number(roomId)} />
    </S.PageLayout>
  );
}
