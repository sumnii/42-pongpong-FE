import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatListType, ChatRoomListType } from "socket/chat";
import { isAuth } from "userAuth";
import { getSocket } from "socket/socket";
import ChatItem from "./ChatItem";
import CreateChatRoom from "./create/CreateBtn";
import RightSide from "@rightSide/RightSide";
import * as S from "./style";

export default function ChatList() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<ChatListType[]>([]);
  const [myChatList, setMyChatList] = useState<ChatListType[]>([]);
  const socket = getSocket();
  if (!isAuth()) navigate("/");
  let no1 = 1;
  let no2 = 1;

  const chatRoomListListener = (res: ChatRoomListType) => {
    if (res.type === "otherRoom") {
      const tmp: ChatListType[] = [];
      res.list.map((elem) => {
        if (elem.status !== "private") {
          tmp.push(elem);
        }
      });
      setChatList(tmp);
    } else if (res.type === "myRoom") {
      setMyChatList(res.list);
    }
  };

  useEffect(() => {
    socket.emit("subscribe", {
      type: "chatRoomList",
    });
    return () => {
      socket.emit("unsubscribe", {
        type: "chatRoomList",
      });
    };
  }, []);

  useEffect(() => {
    socket.on("message", chatRoomListListener);
    return () => {
      socket.off("message", chatRoomListListener);
    };
  }, []);

  return (
    <>
      <S.PageLayout>
        <S.HeaderBox>
          <S.H2>참여 가능한 채팅방</S.H2>
          <CreateChatRoom />
        </S.HeaderBox>
        <S.ChatList>
          <S.ChatItem head>
            <ChatItem no={"No"} subject={"방제"} owner={"방장"} participantsCnt={"인원"} head />
          </S.ChatItem>
          {chatList.map((room) => {
            return (
              <S.ChatItem key={room.roomId}>
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
        {myChatList.map((room) => {
          return (
            <S.ChatItem key={room.roomId}>
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
      <RightSide />
    </>
  );
}
