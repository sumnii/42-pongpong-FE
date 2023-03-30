import React from "react";

export default function GameList(props: {
  setPage: (page: "main" | "chat" | "game") => void;
}) {
  return (
    <div>
      <h1>진행중인 게임</h1>
      <span>게임 리스트</span>
      <button onClick={() => props.setPage("game")}>매치메이킹</button>
    </div>
  );
}
