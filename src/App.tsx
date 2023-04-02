import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "@main/Main"
import ChatList from "@chatList/ChatList"
import GameList from "@gameList/GameList"
import ChatRoom from "@chatRoom/ChatRoom"
import GameRoom from "@gameRoom/GameRoom"
import Profile from "@leftSide/profile/Profile"
import RightSide from "@rightSide/RightSide"
import ListTabBar from "@centerHeader/ListTabBar"
import * as S from "./style"

function App() {
  const [profileUser, setProfileUser] = useState(0)
  const [inPageOf, setInPageOf] = useState<"main" | "chat" | "game">("main")

  return (
    <S.AppLayout>
      <S.LeftSideLayout>
        <Profile userId={profileUser} />
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
  )
}

export default App
