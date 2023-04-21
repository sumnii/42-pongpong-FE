import React, { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import * as S from "./style";
import { ChatEventResult } from "socket/chat";
import { getSocket } from "socket/socket";

export default function SendBtn(props: { room: string | number }) {
  const [chatInput, setChatInput] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const socket = getSocket();

  useEffect(() => {
    if (chatInput) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [chatInput]);

  useEffect(() => {
    socket.on("chatResult", listener);
    return () => {
      socket.off("chatResult", listener);
    };
  }, []);

  function chatInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setChatInput(e.target.value);
  }

  function ChattingHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (chatInput) {
      socket.emit("chat", {
        roomId: props.room,
        content: chatInput,
      });
      setChatInput("");
    }
  }
  const listener = (res: ChatEventResult) => {
    if (res.status === "warning") {
      alert(res.detail);
    }
  };

  return (
    <S.Form>
      <S.Wrapper>
        <S.Input onChange={chatInputHandler} value={chatInput} autoFocus></S.Input>
        <S.SendBtn onClick={ChattingHandler} disabled={disableBtn}>
          <BsSend size={20} color="white" />
        </S.SendBtn>
      </S.Wrapper>
    </S.Form>
  );
}
