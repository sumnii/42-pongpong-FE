import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "@hooks/AuthContext";
import Main from "@page/main/Main";
import ChatList from "@page/chatList/ChatList";
import GameList from "@page/gameList/GameList";
import ChatRoom from "@page/chatRoom/ChatRoom";
import GameRoom from "@page/gameRoom/GameRoom";
import Profile from "@leftSide/profile/Profile";
import ListTabBar from "@centerHeader/ListTabBar";
import RightSide from "@rightSide/RightSide";
import * as S from "./style";

function Auth() {
  const authState = useContext(AuthContext)?.authState;
  const [profileUser, setProfileUser] = useState(authState?.username);
  const [inPageOf, setInPageOf] = useState<"main" | "chat" | "game">("main");

  return (
    <S.AppLayout>
      <S.LeftSideLayout>
        <Profile username={profileUser} />
      </S.LeftSideLayout>
      <S.CenterLayout>
        <BrowserRouter>
          <ListTabBar />
          <Routes>
            <Route path="/" element={<Main setPage={setInPageOf} />} />
            <Route path="/chat/list" element={<ChatList setPage={setInPageOf} />} />
            <Route path="/game/list" element={<GameList setPage={setInPageOf} />} />
            <Route path="/chat/:roomId" element={<ChatRoom setPage={setInPageOf} />} />
            <Route path="/game/:gameId" element={<GameRoom setPage={setInPageOf} />} />
            {/* TODO: 경로 일치하지 않으면 404 NON FOUND 페이지 */}
          </Routes>
        </BrowserRouter>
      </S.CenterLayout>
      <S.RightSideLayout>
        <RightSide inPageOf={inPageOf} setProfileUser={setProfileUser} />
      </S.RightSideLayout>
    </S.AppLayout>
  );
}

export default Auth;
