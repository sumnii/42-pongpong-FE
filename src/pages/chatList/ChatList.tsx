import { useNavigate } from "react-router-dom"
import ChatRoom from "pages/chatRoom/ChatRoom"
import * as S from "./style"

export default function ChatList(props: { setPage: (page: "main") => void }) {
  props.setPage("main")
  const navigate = useNavigate()
  const chatInfo = [
    { id: 1, subject: "채팅방 1번", owner: "숨송", participantsCnt: 2 },
    { id: 2, subject: "채팅방 2번", owner: "아무개", participantsCnt: 4 },
  ]
  let roomCnt = 0

  return (
    <S.PageLayout>
      <S.H2>참여 가능한 채팅방</S.H2>
      <S.ChatList>
        <S.ChatItem head>
          <S.No>No</S.No>
          <S.Subject>제목</S.Subject>
          <S.Owner>방장</S.Owner>
          <S.ParticipantsCnt>인원</S.ParticipantsCnt>
          <S.EntryBtn disabled></S.EntryBtn>
        </S.ChatItem>
        {chatInfo.map((room) => {
          return (
            <S.ChatItem key={room.id}>
              <S.No>{(roomCnt += 1)}</S.No>
              <S.Subject>{room.subject}</S.Subject>
              <S.Owner>{room.owner}</S.Owner>
              <S.ParticipantsCnt>{room.participantsCnt}</S.ParticipantsCnt>
              <S.EntryBtn
                onClick={() => {
                  navigate(`/chat/${room.id}`)
                }}
              >
                참가
              </S.EntryBtn>
            </S.ChatItem>
          )
        })}
      </S.ChatList>
      <hr />
      <S.H2>참여중인 채팅방</S.H2>
      <S.ChatList>{/* 참여중 채팅방 구현 예정 / 컴포넌트 분리 */}</S.ChatList>
    </S.PageLayout>
  )
}
