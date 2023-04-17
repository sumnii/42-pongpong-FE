import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { isAuth } from "userAuth";
import * as S from "./style";
import Screen from "./Screen";
import ExitBtn from "./ExitBtn";
import SendBtn from "./SendBtn";

export default function ChatRoom() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  const { roomId } = useParams();
  if (Number.isNaN(Number(roomId))) navigate("/404");
  const [target, setTarget] = useSearchParams();

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2> #{roomId} {target.get("title")} 채팅방 입장완료</S.H2>
        <ExitBtn room={Number(roomId)} />
      </S.HeaderBox>
      <S.MainBox>
        <Screen room={Number(roomId)}/>
        <SendBtn room={Number(roomId)} />
      </S.MainBox>
    </S.PageLayout>
  );
}
