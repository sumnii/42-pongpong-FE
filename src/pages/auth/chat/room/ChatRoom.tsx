import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { isAuth } from "userAuth";
import * as S from "./style";
import Screen from "./Screen";
import ExitBtn from "./ExitBtn";
import SendBtn from "./SendBtn";
import { getSocket } from "socket/socket";
import { useEffect } from "react";
import RightSide from "@rightSide/RightSide";

export default function ChatRoom() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  const { roomId } = useParams();
  if (Number.isNaN(Number(roomId))) navigate("/404");
  const [target, setTarget] = useSearchParams();
  const socket = getSocket();

  useEffect(() => {
    socket.emit("subscribe", {
      type: "chatRoom",
      roomId: Number(roomId),
    });
    return () => {
      socket.emit("unsubscribe", {
        type: "chatRoom",
        roomId: Number(roomId),
      });
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
          <Screen room={Number(roomId)} />
          <SendBtn room={Number(roomId)} />
        </S.MainBox>
      </S.PageLayout>
      <RightSide />
    </>
  );
}
