import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUsername } from "userAuth";
import loadable from "@loadable/component";
import Main from "@page/main/Main";
import Profile from "@leftSide/Profile";
import ListTabBar from "@header/ListTabBar";
import NotFound from "pages/NotFound";
import { ProfileContext } from "hooks/context/ProfileContext";
import { getSocket } from "socket/socket";
import * as S from "./style";

const ChatList = loadable(() => {
  return import("@page/chat/list/ChatList");
});
const ChatRoom = loadable(() => {
  return import("@page/chat/room/ChatRoom");
});
const GameList = loadable(() => {
  return import("@page/game/list/GameList");
});
const GameRoom = loadable(() => {
  return import("@page/game/room/GameRoom");
});

function Auth() {
  const [profileUser, setProfileUser] = useState(getUsername());
  const socket = getSocket();

  const errorListener = (res: { status: string; detail: string }) => {
    if (res.status === "error") {
      alert("이미 접속 중 입니다.");
      window.open("about:blank", "_parent")?.parent.close();
    }
  };

  // TEST: 구독/해제 테스트
  useEffect(() => {
    socket.on("subscribeResult", (data) => console.log("구독", data));
    socket.on("unsubscribeResult", (data) => console.log("구독해제", data));
    socket.on("error", errorListener);
    return () => {
      socket.off("subscribeResult", (data) => console.log("구독", data));
      socket.off("unsubscribeResult", (data) => console.log("구독해제", data));
      socket.off("error", errorListener);
    };
  }, []);

  return (
    <S.AppLayout>
      <BrowserRouter>
        <ProfileContext.Provider value={setProfileUser}>
          <ListTabBar />
          <S.HomeLayout>
            <S.LeftSideLayout>
              <Profile username={profileUser} />
            </S.LeftSideLayout>
            <S.PageLayout>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/chat/list" element={<ChatList />} />
                <Route path="/game/list" element={<GameList />} />
                <Route path="/chat/:roomId" element={<ChatRoom />} />
                <Route path="/game/:gameId" element={<GameRoom />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </S.PageLayout>
          </S.HomeLayout>
        </ProfileContext.Provider>
      </BrowserRouter>
    </S.AppLayout>
  );
}

export default Auth;
