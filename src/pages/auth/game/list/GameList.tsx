import { useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import GameItem from "./GameItem";
import * as S from "./style";
import RightSide from "@rightSide/RightSide";
import { useState } from "react";
import Modal from "modal/layout/Modal";
import MatchGameModal from "modal/MatchGameModal";

export default function GameList() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState("");

  let gameCnt = 0;
  // 임시 더미데이터
  const gameData = [
    {
      id: 1,
      player1: "숨송",
      player2: "아무개",
      player1Score: 3,
      player2Score: 4,
    },
    {
      id: 2,
      player1: "서진",
      player2: "호쏭",
      player1Score: 2,
      player2Score: 2,
    },
  ];

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
          <S.GameItem head>
            <GameItem no={"No"} p1={"P1"} p2={"P2"} p1Score={"P1"} p2Score={"P2"} head />
          </S.GameItem>
          {gameData.map((game) => {
            return (
              // TODO: 내가 참여중인 게임은 관전 대신 재접속 띄우기?
              <S.GameItem key={game.id}>
                <GameItem
                  no={(gameCnt += 1)}
                  p1={game.player1}
                  p2={game.player2}
                  p1Score={game.player1Score}
                  p2Score={game.player2Score}
                />
              </S.GameItem>
            );
          })}
        </S.GameList>
      </S.PageLayout>
      <RightSide />
    </>
  );
}
