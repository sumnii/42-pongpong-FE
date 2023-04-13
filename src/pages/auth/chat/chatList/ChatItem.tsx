import JoinChatRoom from "../joinChatRoom/JoinChatRoom";
import * as S from "./style";
import { RiLockPasswordLine } from "react-icons/ri";
interface ChatItemProps {
  no: string | number;
  subject: string;
  owner: string;
  participantsCnt: string | number;
  head?: boolean;
  icon?: boolean;
}

export default function ChatItem(props: ChatItemProps) {
  return (
    <>
      <S.No>{props.no}</S.No>
      <S.Subject>
        {props.icon && <RiLockPasswordLine />}
        {props.subject}
      </S.Subject>
      <S.Owner>{props.owner}</S.Owner>
      <S.ParticipantsCnt>{props.participantsCnt}</S.ParticipantsCnt>
      {props.head ? <S.EntryBtn head /> : <JoinChatRoom no={props.no} />}
    </>
  );
}
