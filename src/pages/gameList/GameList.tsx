import React from "react";

export default function GameList(props: { setPage: (page: "main") => void }) {
  props.setPage("main");

  return (
    <div>
      <h1>진행중인 게임</h1>
      <span>게임 리스트</span>
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
