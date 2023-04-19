import JoinChatRoom from "./join/JoinBtn";
import * as S from "./style";
import { RiLockPasswordLine } from "react-icons/ri";
interface ChatItemProps {
  no: string | number;
  subject: string;
  owner: string;
  participantsCnt: string | number;
  status?: string;
  head?: boolean;
  room?: number | undefined;
  myRoom?: boolean;
}

export default function ChatItem(props: ChatItemProps) {
  return (
    <>
      <S.No>{props.no}</S.No>
      <S.Subject>
        {props.status === "protected" && <RiLockPasswordLine />}
        {props.subject}
      </S.Subject>
      <S.Owner>{props.owner}</S.Owner>
      <S.ParticipantsCnt>{props.participantsCnt}</S.ParticipantsCnt>
      {props.head ? (
        <S.EntryBtn head />
      ) : (
        <JoinChatRoom no={props.no} status={props.status} roomId={props.room} title={props.subject} myRoom={props.myRoom}/>
      )}
    </>
  );
}
