import React from "react";
import { useParams } from "react-router-dom";

export default function ChatRoom(props: { setPage: (page: "chat") => void }) {
  const { roomId } = useParams();
  props.setPage("chat");

  return (
    <div>
      <h1>{roomId}번 채팅방 입장완료</h1>
    </div>
  );
}
