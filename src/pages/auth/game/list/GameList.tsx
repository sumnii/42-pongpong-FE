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

export default function GameList() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");

  const socket = getSocket();
  const [gameRoomList, setGameRoomList] = useState<T.GameRoomListArray>();
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
    socket.on("message", gameRoomListListener);
    return () => {
      socket.off("message", gameRoomListListener);
    };
  }, []);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

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
