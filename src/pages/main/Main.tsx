import React from "react";
import { useNavigate } from "react-router-dom";

export default function Main(props: {
  setPage: (page: "main" | "chat" | "game") => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/chat/list")}>채팅방</button>
      <button onClick={() => navigate("/game/list")}>게임방</button>
      <h1>welcome to pongpong !</h1>
    </>
  );
}
