import { ChatListArray } from "socket/passive/chatRoomListType";
import ChatItem from "../ChatItem";
import * as S from "../style";

export default function JoinedList(props: { myChatList: ChatListArray }) {
  let no = 1;

  return (
    <S.ChatListLayout>
      <S.HeaderBox>
        <S.H2>참여중인 채팅방</S.H2>
      </S.HeaderBox>
      <S.ChatItem head>
        <ChatItem no={"No"} subject={"방제"} owner={"방장"} participantsCnt={"인원"} head />
      </S.ChatItem>
      <S.ChatList>
        {props.myChatList.map((room) => {
          return (
            <S.ChatItem key={room.roomId}>
              <ChatItem
                no={no++}
                subject={room.title}
                owner={room.owner}
                participantsCnt={room.joining}
                status={room.status}
                room={room.roomId}
                myRoom={true}
              />
            </S.ChatItem>
          );
        })}
      </S.ChatList>
    </S.ChatListLayout>
  );
}
