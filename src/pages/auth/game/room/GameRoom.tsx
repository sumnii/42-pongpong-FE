import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { isAuth } from "userAuth";
import RightSide from "@rightSide/RightSide";
import { getSocket } from "socket/socket";
import Screen from "./Screen";
import { UserListContext } from "hooks/context/UserListContext";
import { GameRoomData, PlayerData, SpectatorData } from "socket/passive/gameType";
import useSubListener from "hooks/useSubListener";
import * as S from "./style";

export default function GameRoom() {
  const navigate = useNavigate();
  const { gameId } = useParams();
  useSubListener({ type: "gameRoom", navigate });

  useEffect(() => {
    if (!isAuth()) navigate("/");
    if (Number.isNaN(Number(gameId))) navigate("/404");
  }, [gameId]);

  const socket = getSocket();
  const roomId = Number(gameId);
  const [result, setResult] = useState("");
  const [players, setPlayers] = useState<PlayerData>();
  const [spectators, setSpectators] = useState<{ username: string }[]>([]);
  const queryClient = useQueryClient();

  function gameRoomListener(res: GameRoomData | SpectatorData) {
    if (res.type === "spectator") {
      setSpectators(res.list);
    } else if (
      res.type === "game" &&
      (players === undefined || players.blue !== res.status.blueUser) //players camp가 바뀌었을때 
    ) {
      setPlayers({ red: res.status.redUser, blue: res.status.blueUser });
    }
  }

  useEffect(() => {
    socket.on("message", gameRoomListener);
    return () => {
      socket.off("message", gameRoomListener);
    };
  }, [players, spectators]);

  const listener = (res: { type: string; status: string }) => {
    if (res.status === "approved") {
      navigate("/game/list");
    } else {
      console.log(res);
      navigate("/game/list");
    }
    queryClient.refetchQueries(["profile"]);
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

  useEffect(() => {
    const id = setTimeout(() => {
      queryClient.refetchQueries(["profile"]);
    }, 300);
    return () => {
      clearTimeout(id);
    };
  }, [roomId, result]);

  return (
    <>
      <S.PageLayout>
        <S.HeaderBox>
          <S.H2>{players && `LIVE MATCH ~ 🟥 ${players.red} vs ${players.blue} 🟦`}</S.H2>
          <S.ExitBtn onClick={exitGameHandler}>퇴장</S.ExitBtn>
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
