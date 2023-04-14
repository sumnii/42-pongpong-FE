import React, { useState } from "react";
import { getSocket } from "socket/socket";

export default function Send(props: { room: string | number }) {
  const [chatInput, setChatInput] = useState("");

  function chatInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setChatInput(e.target.value);
  }

  function ChattingHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const socket = getSocket();
    if (socket) {
      socket.emit('chat', {
        "roomId": props.room,
        "content": chatInput
      });
      socket.on('chatResult', data => {
        console.log(data);
      })
    }
  }
  return (
    <form>
      <input onChange={chatInputHandler}></input>
      <button onClick={ChattingHandler}>보내기</button>
    </form>
  )
}