import { ChatListArray } from "socket/passive/chatRoomListType";
import ChatItem from "../ChatItem";
import CreateChatRoom from "./CreateBtn";
import * as S from "../style";

export default function AvailableList(props: { chatList: ChatListArray }) {
  let no = 1;

  return (
    <S.ChatListLayout>
      <S.HeaderBox>
        <S.H2>참여 가능한 채팅방</S.H2>
        <CreateChatRoom />
      </S.HeaderBox>
      <S.ChatItem head>
        <ChatItem no={"No"} subject={"방제"} owner={"방장"} participantsCnt={"인원"} head />
      </S.ChatItem>
      <S.ChatList>
        {props.chatList.map((room) => {
          return (
            <S.ChatItem key={room.roomId}>
              <ChatItem
                no={no++}
                subject={room.title}
                owner={room.owner}
                participantsCnt={room.joining}
                status={room.status}
                room={room.roomId}
              />
            </S.ChatItem>
          );
        })}
      </S.ChatList>
    </S.ChatListLayout>
  );
}
