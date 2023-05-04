import { useNavigate } from "react-router-dom";
import * as S from "./style";

type GameItemProps = {
  no: number;
  rule: string;
  p1: string;
  p2: string;
};

export default function GameItem({ no, rule, p1, p2 }: GameItemProps) {
  const navigate = useNavigate();

  return (
    <S.GameItem>
      <S.GameHeaderBox>
        <S.No>{no}</S.No>
        <S.Rule>🚩 {rule}</S.Rule>
        <S.EntryBtn onClick={() => navigate(`/game/${no}`)}>관전</S.EntryBtn>
      </S.GameHeaderBox>
      <S.PlayersBox>
        <S.PlayerBox>
          <S.PlayerAvatar red />
          <S.PlayerName>{p1}</S.PlayerName>
        </S.PlayerBox>
        <S.Versus>vs</S.Versus>
        <S.PlayerBox>
          <S.PlayerAvatar blue />
          <S.PlayerName>{p2}</S.PlayerName>
        </S.PlayerBox>
      </S.PlayersBox>
    </S.GameItem>
  );
}
