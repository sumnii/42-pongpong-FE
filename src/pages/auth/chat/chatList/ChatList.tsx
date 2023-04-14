import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, isAuth } from "userAuth";
import ChatItem from "./ChatItem";
import * as S from "./style";
import CreateChatRoom from "../createChatRoom/CreateChatRoom";
import { ChatListType, MyChatListType } from "ws/chat";

type propsType = {
  setPage: (page: "main") => void;
  chatRoom: ChatListType[];
  myChatRoom: MyChatListType[];
};

export default function ChatList(props: propsType) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) navigate("/");
    props.setPage("main");
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
        {props.chatRoom.map((room) => {
          return (
            <S.ChatItem key={room.roomId}>
              <ChatItem
                no={room.roomId}
                subject={room.title}
                owner={getAuth().username}
                participantsCnt={12}
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
      {props.myChatRoom.map((room) => {
        return (
          <S.ChatItem key={room.roomId}>
            <ChatItem
              no={room.roomId}
              subject={room.title}
              owner={getAuth().username}
              participantsCnt={12}
            />
          </S.ChatItem>
        );
      })}
    </S.PageLayout>
  );
}
