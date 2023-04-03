import { useParams } from "react-router-dom"
import * as S from "./style"

export default function GameRoom(props: { setPage: (page: "game") => void }) {
  props.setPage("game")
  const { gameId } = useParams()

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>{gameId}번 게임방 접속 완료</S.H2>
      </S.HeaderBox>
    </S.PageLayout>
  )
}
