import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { isAuth } from "userAuth";
import Screen from "./Screen";
import ExitBtn from "./ExitBtn";
import SendBtn from "./SendBtn";
import { UserListContext } from "hooks/context/UserListContext";
import { getUsername } from "userAuth";
import { getSocket } from "socket/socket";
import RightSide from "@rightSide/RightSide";
import * as T from "socket/passive/chatRoomType";
import * as S from "./style";

export default function ChatRoom() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  const { roomId } = useParams();
  if (Number.isNaN(Number(roomId))) navigate("/404");
  const [target, setTarget] = useSearchParams();
  const [screen, setScreen] = useState<T.ChatData[] | null>(null);
  const [participant, setParticipant] = useState<T.UserListArray | null>(null);
  const [banned, setBanned] = useState<T.BanListArray | null>(null);
  const socket = getSocket();
  const myOper = useRef("participant");

  function handleChatRoom(res: T.HistoryData | T.ChatRoomData | T.ChatData | T.AffectedData) {
    // TEST: 채팅방 내 전체 이벤트 리스너
    if (res.roomId !== Number(roomId)) return;
    console.log("채팅방", res);
    if (res.type === "chat" && screen) {
      setScreen(screen.concat(res));
    } else if (res.type === "history") {
      const initialChat: T.ChatData[] = [];
      res.list.map((chat) => {
        initialChat.push({ ...chat, type: "chat", roomId: Number(roomId) });
      });
      setScreen(initialChat);
    } else if (res.type === "chatRoom") {
      const myRoomInfo = res.userList.filter((user) => user.username === getUsername())[0];
      if (myRoomInfo?.owner) myOper.current = "owner";
      if (myRoomInfo?.admin) myOper.current = "admin";
      setParticipant(res.userList);
      setBanned(res.banList);
    } else if (res.type === "kick" || res.type === "ban") {
      // TODO: 추방 알림 띄워주기
      navigate("/chat/list");
    }
  }

  useEffect(() => {
    socket.on("message", handleChatRoom);
    return () => {
      socket.off("message", handleChatRoom);
    };
  });

  useEffect(() => {
    socket.emit("subscribe", { type: "chatRoom", roomId: Number(roomId) });
    return () => {
      socket.emit("unsubscribe", { type: "chatRoom", roomId: Number(roomId) });
    };
  }, []);

  return (
    <>
      <S.PageLayout>
        <S.HeaderBox>
          <S.H2>
            {" "}
            #{roomId} {target.get("title")} 채팅방 입장완료
          </S.H2>
          <ExitBtn room={Number(roomId)} />
        </S.HeaderBox>
        <S.MainBox>
          <Screen room={Number(roomId)} screen={screen} />
          <SendBtn room={Number(roomId)} />
        </S.MainBox>
      </S.PageLayout>
      <UserListContext.Provider value={{ participant, banned, myOper: myOper.current }}>
        <RightSide />
      </UserListContext.Provider>
    </>
  );
}
