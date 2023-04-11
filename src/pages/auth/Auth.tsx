import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUsername } from "userAuth";
import { getSocket } from "socket/socket";
import Main from "@page/main/Main";
import Profile from "@leftSide/profile/Profile";
import ListTabBar from "@centerHeader/ListTabBar";
import RightSide from "@rightSide/RightSide";
import * as S from "./style";
import loadable from "@loadable/component";
import NotFound from "pages/NotFound";
import { ChatListType, MyChatListType } from "ws/chat";

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
  const [myChatList, setMyChatList] = useState<MyChatListType[]>([]);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on("updateChatRoomList", (data: []) => {
        const tmp: ChatListType[] = [];
        data.map((elem: ChatListType) => {
          if (elem.status !== "private") {
            tmp.push(elem);
          }
        });
        setChatList([...tmp]);
      });
      socket.on("updateMyChatRoomList", (data: []) => {
        setMyChatList([...data]);
      });
    }
  }, [chatList, myChatList]);
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
                <ChatList setPage={setInPageOf} chatRoom={chatList} myChatRoom={myChatList} />
              }
            />
            <Route path="/game/list" element={<GameList setPage={setInPageOf} />} />
            <Route path="/chat/:roomId" element={<ChatRoom setPage={setInPageOf} />} />
            <Route path="/game/:gameId" element={<GameRoom setPage={setInPageOf} />} />
            <Route path={"*"} element={<NotFound />} />
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
