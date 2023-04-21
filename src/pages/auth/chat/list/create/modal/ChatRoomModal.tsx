import * as S from "./style";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEventResult } from "socket/chat";
import { getSocket } from "socket/socket";

type modalProps = {
  close: () => void;
};

function ChatRoomModal(props: modalProps) {
  const [status, setStatus] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const socket = getSocket();

  function setStatusHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value);
    if (notice) setNotice("");
    if (pwInput) setPwInput("");
  }

  function setTitleHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleInput(e.target.value);
    if (notice) setNotice("");
  }

  function setPwHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPwInput(e.target.value);
    if (notice) setNotice("");
  }

  const listener = (res: ChatEventResult) => {
    if (res.status === "approved") {
      navigate({
        pathname: `/chat/${res.roomId}`,
        search: `title=${titleInput}`,
      });
      props.close();
    } else if (res.status === "warning") {
      setNotice(res.detail);
    } else if (res.status === "error") {
      console.log(res); // 개발자가 알아야하는 error
    }
  };

  useEffect(() => {
    socket.on("createChatRoomResult", listener);
    return () => {
      socket.off("createChatRoomResult", listener);
    };
  });

  function createChatRoomHandler(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isComplete()) {
      if (status === "protected") {
        socket.emit("createChatRoom", {
          status: status,
          title: titleInput,
          password: pwInput,
        });
      } else {
        socket.emit("createChatRoom", {
          status: status,
          title: titleInput,
        });
      }
    } else {
      setNotice("필수 항목을 입력해주세요.");
    }
  }

  function isComplete(): boolean {
    if (titleInput && status) {
      if (status === "protected" && !pwInput) return false;
      return true;
    }
    return false;
  }

  return (
    <S.CreateRoomLayout>
      <form onSubmit={createChatRoomHandler}>
        <h1>새로운 채팅방 만들기</h1>
        <S.Wrapper>
          <S.Input
            placeholder="채팅방 이름"
            value={titleInput}
            onChange={setTitleHandler}
            autoFocus
          />
        </S.Wrapper>
        <S.Wrapper>
          <select onChange={setStatusHandler}>
            <option value="">--채팅방을 설정해주세요--</option>
            <option value="public">공개방</option>
            <option value="private">비공개방</option>
            <option value="protected">비밀번호방</option>
          </select>
        </S.Wrapper>
        <S.Wrapper>
          <S.Input
            placeholder="비밀번호"
            onChange={setPwHandler}
            disabled={status !== "protected"}
            value={pwInput}
          />
        </S.Wrapper>
        <S.Span color="red">{notice}</S.Span>
        <S.Wrapper>
          <S.ModalButton2> 만들기 </S.ModalButton2>
        </S.Wrapper>
      </form>
    </S.CreateRoomLayout>
  );
}

export default ChatRoomModal;
