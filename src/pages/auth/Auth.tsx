import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUsername } from "userAuth";
import Main from "@page/main/Main";
import Profile from "@leftSide/profile/Profile";
import ListTabBar from "@centerHeader/ListTabBar";
import RightSide from "@rightSide/RightSide";
import * as S from "./style";
import loadable from "@loadable/component";
import NotFound from "pages/NotFound";
import { ChatListType } from "socket/chat";
import { getSocket } from "socket/socket";

const ChatList = loadable(() => {
  return import("@page/chat/chatList/ChatList");
});
const ChatRoom = loadable(() => {
  return import("@page/chat/chatRoom/ChatRoom");
});
const GameList = loadable(() => {
  return import("@page/game/gameList/GameList");
});
const GameRoom = loadable(() => {
  return import("@page/game/gameRoom/GameRoom");
});

function Auth() {
  const [profileUser, setProfileUser] = useState(getUsername());
  const [inPageOf, setInPageOf] = useState<"main" | "chat" | "game">("main");
  const [chatList, setChatList] = useState<ChatListType[]>([]);
  const [myChatList, setMyChatList] = useState<ChatListType[]>([]);
  const socket = getSocket();

  const chatRoomListener = (res: ChatListType[]) => {
    let tmp: ChatListType[] = [];
    res.map((elem) => {
      if (elem.status !== "private") {
        tmp.push(elem);
      }
    });
    setChatList(tmp);
  };

  const myChatRoomListener = (res: ChatListType[]) => {
    setMyChatList(res);
  }

  useEffect(() => {
    socket.on("updateChatRoomList", chatRoomListener);
    socket.on("updateMyChatRoomList", myChatRoomListener);
    return () => {
      socket.off("updateChatRoomList", chatRoomListener);
      socket.off("updateMyChatRoomList", myChatRoomListener);
    }
  });
  
  return (
    <S.AppLayout>
      <BrowserRouter>
        <S.LeftSideLayout>
          <Profile username={profileUser} />
        </S.LeftSideLayout>
        <S.CenterLayout>
          <ListTabBar />
          <Routes>
            <Route path="/" element={<Main setPage={setInPageOf} />} />
            <Route
              path="/chat/list"
              element={
                <ChatList setPage={setInPageOf} chat={chatList} myChat={myChatList}/>
              }
            />
            <Route path="/game/list" element={<GameList setPage={setInPageOf} />} />
            <Route path="/chat/:roomId" element={<ChatRoom setPage={setInPageOf} />} />
            <Route path="/game/:gameId" element={<GameRoom setPage={setInPageOf} />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </S.CenterLayout>
        <S.RightSideLayout>
          <RightSide inPageOf={inPageOf} setProfileUser={setProfileUser} />
        </S.RightSideLayout>
      </BrowserRouter>
    </S.AppLayout>
  );
}

export default Auth;
