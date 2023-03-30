import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "@main/Main";
import ChatList from "@chatList/ChatList";
import GameList from "@gameList/GameList";
import Profile from "@leftSide/profile/Profile";
import RightSide from "@rightSide/RightSide";
import * as S from "./style";

function App() {
  const [profileUser, setProfileUser] = useState(0);
  const [inPageOf, setInPageOf] = useState<"main" | "chat" | "game">("main");

  return (
    <S.AppLayout>
      <S.LeftSideLayout>
        <Profile user={profileUser} />
      </S.LeftSideLayout>
      <S.CenterLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main setPage={setInPageOf} />}></Route>
            <Route
              path="/list/chat"
              element={<ChatList setPage={setInPageOf} />}
            ></Route>
            <Route
              path="/list/game"
              element={<GameList setPage={setInPageOf} />}
            ></Route>
            {/* TODO: 경로 일치하지 않으면 404 NON FOUND 페이지 */}
          </Routes>
        </BrowserRouter>
      </S.CenterLayout>
      <S.RightSideLayout>
        {/* page에 따라 유저+유저리스트 / 참여자 리스트로 나누기 */}
        <RightSide inPageOf={inPageOf} />
      </S.RightSideLayout>
    </S.AppLayout>
  );
}

export default App;
