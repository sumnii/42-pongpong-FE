import { useParams } from "react-router-dom"

export default function GameRoom(props: { setPage: (page: "game") => void }) {
  props.setPage("game")
  const { gameId } = useParams()

  return (
    <>
      <h1>{gameId}번 게임방 접속 완료</h1>
    </>
  )
}
