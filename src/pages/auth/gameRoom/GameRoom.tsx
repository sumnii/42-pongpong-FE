import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as S from "./style";

export default function GameRoom(props: { setPage: (page: "game") => void }) {
  const { gameId } = useParams();

  useEffect(() => {
    props.setPage("game");
  }, []);

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>{gameId}번 게임방 접속 완료</S.H2>
      </S.HeaderBox>
    </S.PageLayout>
  );
}
