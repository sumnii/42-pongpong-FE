import React from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/list/chat")}>채팅방</button>
      <button onClick={() => navigate("/list/game")}>게임방</button>
      <h1>welcome to pongpong !</h1>
    </>
  );
}
