import * as S from './style';
import { GrSecure } from "react-icons/gr";
import React, { useState } from 'react';

type modalProps = {
  sendFirst: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sendSecond: (e: React.FormEvent<HTMLFormElement>) => void;
  auth: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AuthModal(props: modalProps) {
  const [disable, setDisable] = useState(false);
  const [authInput, setAuthInput] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeFail, setNoticeFail] = useState("");

  function getAuthHandler(e: React.MouseEvent<HTMLButtonElement>) {
    props.sendFirst(e);
    setNotice("인증번호를 보냈습니다.");
    setDisable(true);
  }

  function onInputAuthHandler(e: React.ChangeEvent<HTMLInputElement>) {
    props.auth(e);
    setAuthInput(e.target.value);
    if (noticeFail) setNoticeFail("");
  }

  async function postAuthHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (authInput) {
      await props.sendSecond(e);
      setNoticeFail("인증번호를 확인해주세요.");
    } else {
      setNoticeFail("인증번호를 입력해주세요.");
    }
  }

  return (
    <S.SignInLayout>
      <form onSubmit={postAuthHandler}>
        <S.FormLogo>
          <GrSecure size={55} />
        </S.FormLogo>
        <S.ModalButton1 type="button" disabled={disable} onClick={getAuthHandler}>인증번호 받기</S.ModalButton1>
        <S.Span color="green">{notice}</S.Span>
        <S.BtnWrapper>
          <S.Input placeholder="인증번호" onChange={onInputAuthHandler}></S.Input>
          <S.ModalButton2>확인</S.ModalButton2>
        </S.BtnWrapper>
        <S.Span color='red'>{noticeFail}</S.Span>
      </form>
    </S.SignInLayout>
  );
}

export default AuthModal