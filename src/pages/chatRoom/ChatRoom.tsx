import { useParams } from "react-router-dom"
import * as S from "./style"

export default function ChatRoom(props: { setPage: (page: "chat") => void }) {
  const { roomId } = useParams()
  props.setPage("chat")

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>{roomId}번 채팅방 입장완료</S.H2>
      </S.HeaderBox>
    </S.PageLayout>
  )
}
