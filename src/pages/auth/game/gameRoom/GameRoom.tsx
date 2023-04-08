import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import { useEffect } from "react";
import * as S from "./style";

export default function GameRoom(props: { setPage: (page: "game") => void }) {
  const { gameId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) navigate("/");
    props.setPage("game");
  });

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>{gameId}번 게임방 접속 완료</S.H2>
      </S.HeaderBox>
    </S.PageLayout>
  );
}
