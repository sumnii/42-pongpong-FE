import React from "react";
import { useNavigate } from "react-router-dom";

export default function GameList(props: { setPage: (page: "main") => void }) {
  props.setPage("main");
  const navigate = useNavigate();
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

  return (
    <div>
      <h1>진행중인 게임</h1>
      <span>게임 리스트</span>
      <ul>
        {gameData.map((game) => {
          return (
            // TODO: 내가 참여중인 게임은 관전 대신 재접속 띄우기?
            <li key={game.id}>
              <span>{game.player1}</span>
              <span>vs</span>
              <span>{game.player2}</span>
              <span>{game.player1Score}</span>
              <span>:</span>
              <span>{game.player2Score}</span>
              <button onClick={() => navigate(`/game/${game.id}`)}>관전</button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          // TODO: 모달 띄우기
          alert("매치메이킹 모달!");
        }}
      >
        매치메이킹
      </button>
    </div>
  );
}
