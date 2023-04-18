import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUsername } from "userAuth";
import loadable from "@loadable/component";
import Main from "@page/main/Main";
import Profile from "@leftSide/Profile";
import ListTabBar from "@centerHeader/ListTabBar";
import RightSide from "@rightSide/RightSide";
import NotFound from "pages/NotFound";
import { ProfileContext } from "hooks/ProfileContext";
import { ChatListType, ChatRoomListType } from "socket/chat";
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
  const [chatList, setChatList] = useState<ChatListType[]>([]);
  const [myChatList, setMyChatList] = useState<ChatListType[]>([]);
  const socket = getSocket();

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
    socket.on("message", chatRoomListListener);
    socket.on("subscribeResult", (data) => console.log(data));
    socket.on("unsubscribeResult", (data) => console.log(data));
    return () => {
      socket.off("message", chatRoomListListener);
      socket.off("subscribeResult", (data) => console.log(data));
      socket.off("unsubscribeResult", (data) => console.log(data));
    };
  });

  return (
    <S.AppLayout>
      <BrowserRouter>
        <ProfileContext.Provider value={setProfileUser}>
          <S.LeftSideLayout>
            <Profile username={profileUser} />
          </S.LeftSideLayout>
          <S.CenterLayout>
            <ListTabBar />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/chat/list" element={<ChatList chat={chatList} myChat={myChatList} />} />
              <Route path="/game/list" element={<GameList />} />
              <Route path="/chat/:roomId" element={<ChatRoom />} />
              <Route path="/game/:gameId" element={<GameRoom />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </S.CenterLayout>
          <S.RightSideLayout>
            <RightSide />
          </S.RightSideLayout>
        </ProfileContext.Provider>
      </BrowserRouter>
    </S.AppLayout>
  );
}

export default Auth;
