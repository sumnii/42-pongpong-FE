import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import * as S from "./style";
import Send from "./SendBtn";
import Screen from "./Screen";
import Exit from "./ExitBtn";

export default function ChatRoom() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  const { roomId } = useParams();

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>{roomId}번 채팅방 입장완료</S.H2>
        <Exit room={Number(roomId)} />
      </S.HeaderBox>
      <S.MainBox>
        <Screen />
        <Send room={Number(roomId)} />
      </S.MainBox>
    </S.PageLayout>
  );
}
