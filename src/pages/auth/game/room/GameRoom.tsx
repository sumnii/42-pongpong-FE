import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import * as S from "./style";
import RightSide from "@rightSide/RightSide";
import { getSocket } from "socket/socket";
import { useEffect, useRef, useState } from "react";
import Screen from "./Screen";

export default function GameRoom() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  const { gameId } = useParams();
  if (Number.isNaN(Number(gameId))) navigate("/404");
  const socket = getSocket();
  const roomId = Number(gameId);
  const [result, setResult] = useState("");

  const listener = (res: { type: string; status: any }) => {
    if (res.status === "approved") {
      navigate("/game/list");
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    socket.on("exitGameRoomResult", listener);
    socket.emit("subscribe", {
      type: "gameRoom",
      roomId: roomId,
    });
    return () => {
      socket.off("exitGameRoomResult", listener);
      socket.emit("unsubscribe", {
        type: "gameRoom",
        roomId: roomId,
      });
    };
  }, [roomId]);

  const exitGameHandler = () => {
    if (result) {
      navigate("/game/list");
    } else {
      socket.emit("exitGameRoom", {
        roomId: roomId,
      });
    }
  };

  return (
    <>
      <S.PageLayout>
        <S.HeaderBox>
          <S.H2>{gameId}번 게임방 접속 완료</S.H2>
          <button onClick={exitGameHandler}>나가기</button>
        </S.HeaderBox>
        <Screen result={result} setResult={setResult} />
      </S.PageLayout>
      <RightSide />
    </>
  );
}
