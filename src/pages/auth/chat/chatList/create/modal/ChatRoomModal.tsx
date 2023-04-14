import * as S from "./style";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChatRoom, joinChatRoom } from "socket/chat";

type modalProps = {
  close: () => void;
  setRoom: Dispatch<SetStateAction<number | undefined>>;
};

function ChatRoomModal(props: modalProps) {
  const navigate = useNavigate();
  const [titleInput, setTitleInput] = useState("");
  const [status, setStatus] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [notice, setNotice] = useState("");

  function setStatusHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value);
    if (notice) setNotice("");
  }

  function setTitleHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleInput(e.target.value);
    if (notice) setNotice("");
  }

  function setPwHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPwInput(e.target.value);
    if (notice) setNotice("");
  }

  function createChatRoomHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (isComplete()) {
      createChatRoom(status, titleInput, pwInput, setNotice, props.close, navigate, props.setRoom);
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
          <S.Input placeholder="채팅방 이름" onChange={setTitleHandler} autoFocus/>
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
