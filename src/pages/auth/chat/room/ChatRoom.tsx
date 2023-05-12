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
import SettingBtn from "./SettingBtn";
import useSubListener from "hooks/useSubListener";
import * as T from "socket/passive/chatRoomType";
import * as S from "./style";

export default function ChatRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [target] = useSearchParams();
  useSubListener({ type: "chatRoom", navigate });

  useEffect(() => {
    if (!isAuth()) navigate("/");
    if (Number.isNaN(Number(roomId))) navigate("/404");
    if (!target.get("title")) navigate("/404");
  });

  const socket = getSocket();
  const [participant, setParticipant] = useState<T.UserListArray | null>(null);
  const [banned, setBanned] = useState<T.BanListArray | null>(null);
  const [blocked, setBlocked] = useState<T.BanListArray | null>(null);
  const myOper = useRef("participant");

  function handleChatRoom(
    res: T.ChatData | T.HistoryData | T.ChatRoomData | T.AffectedData | T.BlockData,
  ) {
    if (res.roomId !== Number(roomId) || res.type === "chat") return;
    if (res.type === "chatRoom") {
      const myRoomInfo = res.userList.filter((user) => user.username === getUsername())[0];
      if (myRoomInfo?.owner) myOper.current = "owner";
      else if (myRoomInfo?.admin) myOper.current = "admin";
      else myOper.current = "participant";
      setParticipant(res.userList);
      setBanned(res.banList);
    } else if (res.type === "kick" || res.type === "ban") {
      // TODO: 추방 알림 모달로?
      alert(res.from + "님이 " + getUsername() + "님을 내보냈습니다.");
      navigate("/chat/list");
    } else if (res.type === "block") {
      setBlocked(res.list);
    }
  }

  useEffect(() => {
    socket.on("message", handleChatRoom);
    return () => {
      socket.off("message", handleChatRoom);
    };
  }, [myOper]);

  useEffect(() => {
    socket.emit("subscribe", { type: "chatRoom", roomId: Number(roomId) });
    return () => {
      socket.emit("unsubscribe", { type: "chatRoom", roomId: Number(roomId) });
    };
  }, [roomId]);

  return (
    <>
      <S.PageLayout>
        <S.HeaderBox>
          <S.TitleWrapper>
            <S.backBtn
              onClick={() => {
                navigate(-1);
              }}
            />
            <S.H2>{target.get("title")}</S.H2>
            {myOper.current === "owner" && <SettingBtn />}
          </S.TitleWrapper>
          <ExitBtn room={Number(roomId)} />
        </S.HeaderBox>
        <S.MainBox>
          <Screen room={Number(roomId)} />
          <SendBtn room={Number(roomId)} />
        </S.MainBox>
      </S.PageLayout>
      <UserListContext.Provider value={{ participant, banned, blocked, myOper: myOper.current }}>
        <RightSide />
      </UserListContext.Provider>
    </>
  );
}
