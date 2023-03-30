import React from "react";

export default function ChatList(props: {
  setPage: (page: "main" | "chat" | "game") => void;
}) {
  return (
    <div>
      <h1>참여 가능한 채팅방</h1>
      <span>채팅방 리스트</span>
      <button
        onClick={() => {
          props.setPage("chat");
        }}
      >
        채팅방1
      </button>
      <hr />
      <h1>참여중인 채팅방</h1>
      <span>채팅방 리스트</span>
    </div>
  );
}
