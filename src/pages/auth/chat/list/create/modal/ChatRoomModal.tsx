import * as S from "./style";
import React, { useEffect, useState } from "react";
import { CreateEvntType } from "socket/chat";
import { getSocket } from "socket/socket";

type modalProps = {
  close: () => void;
};

function ChatRoomModal(props: modalProps) {
  const [titleInput, setTitleInput] = useState("");
  const [status, setStatus] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [notice, setNotice] = useState("");
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

  const listener = (res: CreateEvntType) => {
    if (res.status === "approved") {
      props.close();
      if (status === "protected") {
        socket.emit("joinChatRoom", {
          roomId: res.roomId,
          password: pwInput,
        });
      } else {
        socket.emit("joinChatRoom", {
          roomId: res.roomId,
        });
      }
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

  function createChatRoomHandler(e: React.MouseEvent<HTMLButtonElement>) {
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
      <form>
        <h1>새로운 채팅방 만들기</h1>
        <S.BtnWrapper>
          <S.Input placeholder="채팅방 이름" onChange={setTitleHandler} autoFocus />
        </S.BtnWrapper>
        <S.BtnWrapper>
          <select onChange={setStatusHandler}>
            <option value="">--채팅방을 설정해주세요--</option>
            <option value="public">공개방</option>
            <option value="private">비공개방</option>
            <option value="protected">비밀번호방</option>
          </select>
        </S.BtnWrapper>
        <S.BtnWrapper>
          <S.Input
            placeholder="비밀번호"
            onChange={setPwHandler}
            disabled={status !== "protected"}
            value={pwInput}
          />
        </S.BtnWrapper>
        <S.Span color="red">{notice}</S.Span>
        <S.BtnWrapper>
          <S.ModalButton2 onClick={createChatRoomHandler}> 만들기 </S.ModalButton2>
        </S.BtnWrapper>
      </form>
    </S.CreateRoomLayout>
  );
}

export default ChatRoomModal;
