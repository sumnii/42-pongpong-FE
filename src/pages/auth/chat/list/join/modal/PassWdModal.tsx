import * as S from "./style";
import React, { Dispatch, SetStateAction, useState } from "react";
import { getSocket } from "socket/socket";

type modalProps = {
  no: string | number;
  close: () => void;
  room: number | undefined;
  noti: string;
  setNoti: Dispatch<SetStateAction<string>>
};

function PassWdModal(props: modalProps) {
  const [pwInput, setPwInput] = useState("");
  const socket = getSocket();

  function setPwHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPwInput(e.target.value);
    if (props.noti) props.setNoti("");
  }

  function checkPwHandler(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isComplete()) {
      socket.emit("joinChatRoom", {
        roomId: props.room,
        password: pwInput,
      })
    } else {
      props.setNoti("비밀번호를 입력해주세요.");
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
        <S.Span color="red">{props.noti}</S.Span>
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
