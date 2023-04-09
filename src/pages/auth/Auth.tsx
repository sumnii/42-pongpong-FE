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

  useEffect(() => {
    const socket = getSocket();
    // 페이지에서 확인하는 이벤트
    console.log("in page", socket);
    if (socket) {
      // 서버에서 완성 전인 이벤트
      // socket.on("updateFriend", (data) => {
      //   console.log("friend", data);
      // });
      socket.on("updateChatRoomList", (data) => {
        console.log("chatroom", data);
      });
      socket.on("updateMyChatRoomList", (data) => {
        console.log("my chatroom", data);
      });
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
            <Route path="/chat/list" element={<ChatList setPage={setInPageOf} />} />
            <Route path="/game/list" element={<GameList setPage={setInPageOf} />} />
            <Route path="/chat/:roomId" element={<ChatRoom setPage={setInPageOf} />} />
            <Route path="/game/:gameId" element={<GameRoom setPage={setInPageOf} />} />
            <Route path={"*"} element={<NotFound />} />
            {/* TODO: 경로 일치하지 않으면 404 NON FOUND 페이지 */}
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
