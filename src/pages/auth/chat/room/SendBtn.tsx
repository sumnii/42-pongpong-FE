import { useEffect, useState } from "react";
import { ChatRoomResponse } from "socket/active/chatEventType";
import { getSocket } from "socket/socket";
import { BsSend } from "react-icons/bs";
import * as S from "./style";

export default function SendBtn(props: { room: string | number }) {
  const [chatInput, setChatInput] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const socket = getSocket();

  const listener = (res: ChatRoomResponse) => {
    if (res.status === "warning") alert(res.detail);
  };

  useEffect(() => {
    if (chatInput) setDisableBtn(false);
    else setDisableBtn(true);
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
