import { Dispatch, SetStateAction } from "react";
import JoinChatRoom from "../joinChatRoom/JoinChatRoom";
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
  setRoom: Dispatch<SetStateAction<number | undefined>>;
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
        <JoinChatRoom
          no={props.no}
          status={props.status}
          roomId={props.room}
          setRoom={props.setRoom}
        />
      )}
    </>
  );
}
