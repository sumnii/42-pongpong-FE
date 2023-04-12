import React, { useEffect, useState } from "react";
import { getSocket } from "socket/socket";
import { BsSend } from 'react-icons/bs'
import * as S from './style';

export default function Send(props: { room: string | number }) {
  const [chatInput, setChatInput] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (chatInput)
      setDisableBtn(false);
    else
      setDisableBtn(true);
  }, [chatInput])

  function chatInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setChatInput(e.target.value);
  }

  function ChattingHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (chatInput) {
      const socket = getSocket();
      if (socket) {
        socket.emit('chat', {
          "roomId": props.room,
          "content": chatInput
        });
        setChatInput("");
        socket.on('chatResult', data => {
          // console.log(data);
        })
      }
    }
  }
  return (
    <S.Form>
      <S.Wrapper>
        <S.Input onChange={chatInputHandler} value={chatInput} autoFocus></S.Input>
        <S.SendBtn onClick={ChattingHandler} disabled={disableBtn}>
          <BsSend size={20} color="white" />
        </S.SendBtn>
      </S.Wrapper>
    </S.Form>
  )
}