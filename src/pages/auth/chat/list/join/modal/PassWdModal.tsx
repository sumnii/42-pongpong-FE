import * as S from "./style";
import React, { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { joinPasswdChatRoom } from "socket/chat";

type modalProps = {
  no: string | number;
  close: () => void;
  navigateFn: NavigateFunction;
  room: number | undefined;
};

function PassWdModal(props: modalProps) {
  const [pwInput, setPwInput] = useState("");
  const [notice, setNotice] = useState("");

  function setPwHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPwInput(e.target.value);
    if (notice) setNotice("");
  }

  function checkPwHandler(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isComplete()) {
      joinPasswdChatRoom(props.room, pwInput, props.navigateFn, setNotice, props.close);
    } else {
      setNotice("비밀번호를 입력해주세요.");
    }
  }

  function isComplete(): boolean {
    if (pwInput) {
      return true;
    }
    return false;
  }

  return (
    <S.CreateRoomLayout>
      <form onSubmit={checkPwHandler}>
        <h3>채팅방 비밀번호를 입력해주세요</h3>
        <S.BtnWrapper>
          <S.Input onChange={setPwHandler} autoFocus type="password" />
        </S.BtnWrapper>
        <S.Span color="red">{notice}</S.Span>
        <S.BtnWrapper>
          <S.ModalButton2 type="submit"> 확인 </S.ModalButton2>
          <S.ModalButton2 type="button" onClick={props.close}>
            취소
          </S.ModalButton2>
        </S.BtnWrapper>
      </form>
    </S.CreateRoomLayout>
  );
}

export default PassWdModal;
