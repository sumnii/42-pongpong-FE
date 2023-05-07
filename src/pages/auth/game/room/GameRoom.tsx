import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import RightSide from "@rightSide/RightSide";
import { getSocket } from "socket/socket";
import { useEffect, useState } from "react";
import Screen from "./Screen";
import { UserListContext } from "hooks/context/UserListContext";
import { GameRoomData, PlayerData, SpectatorData } from "socket/passive/gameType";
import * as S from "./style";

export default function GameRoom() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  const { gameId } = useParams();
  if (Number.isNaN(Number(gameId))) navigate("/404");
  const socket = getSocket();
  const roomId = Number(gameId);
  const [result, setResult] = useState("");
  const [players, setPlayers] = useState<PlayerData>();
  const [spectators, setSpectators] = useState<{ username: string }[]>([]);

  function gameRoomListener(res: GameRoomData | SpectatorData) {
    if (res.type === "spectator") {
      setSpectators(res.list);
    } else if (res.type === "game" && players === undefined) {
      setPlayers({ red: res.status.redUser, blue: res.status.blueUser });
    }
  }

  useEffect(() => {
    socket.on("message", gameRoomListener);
    return () => {
      socket.off("message", gameRoomListener);
    };
  }, [players, spectators]);

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
      {players && spectators && (
        <UserListContext.Provider value={{ players, spectators }}>
          <RightSide />
        </UserListContext.Provider>
      )}
    </>
  );
}
