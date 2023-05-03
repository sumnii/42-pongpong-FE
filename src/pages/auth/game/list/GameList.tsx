import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import GameItem from "./GameItem";
import RightSide from "@rightSide/RightSide";
import Modal from "modal/layout/Modal";
import MatchGameModal from "modal/MatchGameModal";
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
    red: "sumsong",
    blue: "안녕하세요안녕하세요",
  },
  {
    roomId: 3,
    rule: "arcade",
    red: "서진",
    blue: "호쏭",
  },
  {
    roomId: 4,
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

  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState("");

  function gameRoomListListener(res: T.GameRoomListData) {
    if (res.type !== "gameRoomList") return;
    setGameRoomList(res.list);
  }

  useEffect(() => {
    socket.emit("subscribe", { type: "gameRoomList" });
    return () => {
      socket.emit("unsubscribe", { type: "gameRoomList" });
    };
  }, []);

  useEffect(() => {
    socket.on("gameRoomList", gameRoomListListener);
    return () => {
      socket.off("gameRoomList", gameRoomListListener);
    };
  }, []);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

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
        {showModal && (
          <Modal setView={closeModalHandler}>
            <MatchGameModal close={closeModalHandler} notice={notice} setNotice={setNotice} />
          </Modal>
        )}
        <S.HeaderBox>
          <S.H2>진행중인 게임</S.H2>
          <S.MatchMakingBtn onClick={openModalHandler}>매치메이킹 등록</S.MatchMakingBtn>
        </S.HeaderBox>
        <S.GameList>
          {gameRoomList &&
            gameRoomList.map((game) => {
              return (
                // TODO: 내가 참여중인 게임은 관전 대신 재접속 띄우기?
                <GameItem
                  key={game.roomId}
                  no={(gameCnt += 1)}
                  rule={game.rule}
                  p1={game.red}
                  p2={game.blue}
                />
              );
            })}
        </S.GameList>
      </S.PageLayout>
      <RightSide />
    </>
  );
}
