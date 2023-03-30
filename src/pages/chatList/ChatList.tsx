import React from "react";
import { useNavigate } from "react-router-dom";
import ChatRoom from "pages/chatRoom/ChatRoom";

export default function ChatList(props: { setPage: (page: "main") => void }) {
  props.setPage("main");
  const navigate = useNavigate();
  const chatInfo = [
    { id: 1, subject: "채팅방 1번", owner: "숨송", participantsCnt: 2 },
    { id: 2, subject: "채팅방 2번", owner: "아무개", participantsCnt: 4 },
  ];

  return (
    <div>
      <h1>참여 가능한 채팅방</h1>
      <span>채팅방 리스트</span>
      <ul>
        {chatInfo.map((room) => {
          return (
            <li key={room.id}>
              <span>{room.subject}</span>
              <span>{room.owner}</span>
              <span>{room.participantsCnt}</span>
              <button
                onClick={() => {
                  navigate(`/chat/${room.id}`);
                }}
              >
                참가
              </button>
            </li>
          );
        })}
      </ul>
      <hr />
      <h1>참여중인 채팅방</h1>
      <span>채팅방 리스트</span>
    </div>
  );
}
