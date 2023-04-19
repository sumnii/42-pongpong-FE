import { useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import ChatItem from "./ChatItem";
import * as S from "./style";
import CreateChatRoom from "./create/CreateBtn";
import { ChatListType } from "socket/chat";

type propsType = {
  chat: ChatListType[];
  myChat: ChatListType[];
};

export default function ChatList(props: propsType) {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  let no1 = 1;
  let no2 = 1;

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>참여 가능한 채팅방</S.H2>
        <CreateChatRoom />
      </S.HeaderBox>
      <S.ChatList>
        <S.ChatItem head>
          <ChatItem no={"No"} subject={"방제"} owner={"방장"} participantsCnt={"인원"} head />
        </S.ChatItem>
        {props.chat.map((room) => {
          return (
            <S.ChatItem key={no1}>
              <ChatItem
                no={no1++}
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
      <hr />
      <S.HeaderBox>
        <S.H2>참여중인 채팅방</S.H2>
      </S.HeaderBox>
      <S.ChatItem head>
        <ChatItem no={"No"} subject={"방제"} owner={"방장"} participantsCnt={"인원"} head />
      </S.ChatItem>
      {props.myChat.map((room) => {
        return (
          <S.ChatItem key={no2}>
            <ChatItem
              no={no2++}
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
    </S.PageLayout>
  );
}
