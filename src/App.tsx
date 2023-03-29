import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "@main/Main";
import ChatList from "@chatList/ChatList";
import GameList from "@gameList/GameList";
import Profile from "@profile/Profile";
import FriendList from "@friendList/FriendList";
import DmList from "@dmList/DmList";
import * as S from "./style";

function App() {
  return (
    <S.AppLayout>
      <S.LeftSideLayout>
        <Profile />
      </S.LeftSideLayout>
      <S.CenterLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/list/chat" element={<ChatList />}></Route>
            <Route path="/list/game" element={<GameList />}></Route>
            {/* TODO: 경로 일치하지 않으면 404 NON FOUND 페이지 */}
          </Routes>
        </BrowserRouter>
      </S.CenterLayout>
      <S.RightSideLayout>
        <FriendList />
        <DmList />
      </S.RightSideLayout>
    </S.AppLayout>
  );
}

export default App;
