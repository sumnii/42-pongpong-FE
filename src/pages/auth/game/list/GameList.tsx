import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import GameItem from "./GameItem";
import RightSide from "@rightSide/RightSide";
import { getSocket } from "socket/socket";
import * as T from "socket/passive/gameType";
import * as S from "./style";

// 임시 더미데이터
const initialGameRoomList = [
  {
    roomId: 1,
    rule: "arcade",
    red: "숨송",
    blue: "아무개",
  },
  {
    roomId: 2,
    rule: "arcade",
    red: "서진",
    blue: "호쏭",
  },
];

export default function GameList() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");

  const socket = getSocket();
  const [gameRoomList, setGameRoomList] = useState<T.GameRoomListArray>(initialGameRoomList);
  let gameCnt = 0;

  function gameRoomListListener(res: T.GameRoomListData) {
    if (res.type !== "gameRoomList") return;
    setGameRoomList(res.list);
  }

  useEffect(() => {
    socket.emit("subcribe", { type: "gameRoomList" });
    return () => {
      socket.emit("unsubcribe", { type: "gameRoomList" });
    };
  }, []);

  useEffect(() => {
    socket.on("gameRoomList", gameRoomListListener);
    return () => {
      socket.emit("unsubcribe", gameRoomListListener);
    };
  }, []);

  return (
    <>
      <S.PageLayout>
        <S.HeaderBox>
          <S.H2>진행중인 게임</S.H2>
          <S.MatchMakingBtn
            onClick={() => {
              // TODO: 모달 띄우기
              alert("매치메이킹 모달!");
            }}
          >
            매치메이킹 등록
          </S.MatchMakingBtn>
        </S.HeaderBox>
        <S.GameList>
          <S.GameItem head>
            <GameItem no={"No"} p1={"P1"} p2={"P2"} head />
          </S.GameItem>
          {gameRoomList &&
            gameRoomList.map((game) => {
              return (
                // TODO: 내가 참여중인 게임은 관전 대신 재접속 띄우기?
                <S.GameItem key={game.roomId}>
                  <GameItem no={(gameCnt += 1)} p1={game.red} p2={game.blue} />
                </S.GameItem>
              );
            })}
        </S.GameList>
      </S.PageLayout>
      <RightSide />
    </>
  );
}
