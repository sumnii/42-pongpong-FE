import { useNavigate } from "react-router-dom"
import * as S from "./style"

interface ChatItemProps {
  no: string | number
  subject: string
  owner: string
  participantsCnt: string | number
  head?: boolean
}

export default function ChatItem(props: ChatItemProps) {
  const navigate = useNavigate()

  return (
    <>
      <S.No>{props.no}</S.No>
      <S.Subject>{props.subject}</S.Subject>
      <S.Owner>{props.owner}</S.Owner>
      <S.ParticipantsCnt>{props.participantsCnt}</S.ParticipantsCnt>
      {props.head ? (
        <S.EntryBtn head />
      ) : (
        <S.EntryBtn
          onClick={() => {
            navigate(`/chat/${props.no}`)
          }}
        >
          참가
        </S.EntryBtn>
      )}
    </>
  )
}
