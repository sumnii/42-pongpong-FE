import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import * as S from "./style";

export default function GameRoom() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  const { gameId } = useParams();

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>{gameId}번 게임방 접속 완료</S.H2>
      </S.HeaderBox>
    </S.PageLayout>
  );
}
