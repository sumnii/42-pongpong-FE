import JoinChatRoom from "../joinChatRoom/JoinChatRoom"
import * as S from "./style"

interface ChatItemProps {
  no: string | number
  subject: string
  owner: string
  participantsCnt: string | number
  head?: boolean
}

export default function ChatItem(props: ChatItemProps) {

  return (
    <>
      <S.No>{props.no}</S.No>
      <S.Subject>{props.subject}</S.Subject>
      <S.Owner>{props.owner}</S.Owner>
      <S.ParticipantsCnt>{props.participantsCnt}</S.ParticipantsCnt>
      {props.head ? (
        <S.EntryBtn head />
      ) : (
        <JoinChatRoom no={props.no} />
      )}
    </>
  )
}
