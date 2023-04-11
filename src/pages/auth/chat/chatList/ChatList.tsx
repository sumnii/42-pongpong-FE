import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, isAuth } from "userAuth";
import ChatItem from "./ChatItem";
import * as S from "./style";
import { getSocket } from "socket/socket";
import CreateChatRoom from "../createChatRoom/CreateChatRoom";
import { ChatInfoType, MyChatInfoType } from "@page/chatContext";

export default function ChatList(props: { setPage: (page: "main") => void }) {
  const navigate = useNavigate();
  const [chatInfo, setChatInfo] = useState<ChatInfoType[]>([]);
  const [myChatInfo, setMyChatInfo] = useState<MyChatInfoType[]>([]);

  useEffect(() => {
    if (!isAuth()) navigate("/");
    props.setPage("main");
    const socket = getSocket();
    if (socket) {
      socket.on("updateChatRoomList", (data: []) => {
        const tmp: ChatInfoType[] = [];
        data.map((elem: ChatInfoType) => {
          if (elem.status !== 'private') {
            tmp.push(elem);
          }
        })
        setChatInfo([...tmp]);
      });
      socket.on("updateMyChatRoomList", (data: []) => {
        setMyChatInfo([...data]);
      })
    }
  }, []);

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
        {chatInfo.map((room) => {
          return (
            <S.ChatItem key={room.roomId}>
              <ChatItem no={room.roomId} subject={room.title} owner={getAuth().username} participantsCnt={12} />
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
      {myChatInfo.map((room) => {
        return (
          <S.ChatItem key={room.roomId}>
            <ChatItem no={room.roomId} subject={room.title} owner={getAuth().username} participantsCnt={12} />
          </S.ChatItem>
        );
      })}
    </S.PageLayout>
  );
}
