import * as S from "./style";
import { GrSecure } from "react-icons/gr";
import React, { useContext, useState } from "react";
import * as auth from "api/auth";
import { setAuth } from "userAuth";
import { AuthContext } from "hooks/context/AuthContext";

export default function OtpCheck(props: { username: string }) {
  const setSigned = useContext(AuthContext);
  const [otpInput, setOtpInput] = useState("");
  const [noticeFail, setNoticeFail] = useState("");

  function onInputOtpHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setOtpInput(e.target.value);
    if (noticeFail) setNoticeFail("");
  }

  async function postOtpHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (otpInput) {
      const res = await auth.checkOtpLogin(otpInput);
      if (res && (res.status === 200)) {
        if (setSigned) setSigned(true);
        setAuth({
          username: props.username,
          token: res.data.accessToken,
        });
      } else {
        console.log(res);
      }
      setNoticeFail("인증번호를 확인해주세요.");
    } else {
      setNoticeFail("인증번호를 입력해주세요.");
    }
  }

  return (
    <S.SignInLayout>
      <S.FormLogo>
        <GrSecure size={55} />
      </S.FormLogo>
      <h2> 휴대폰 인증번호를 입력해주세요</h2>
      <S.Wrapper>
        <S.Input2 onChange={onInputOtpHandler}></S.Input2>
        <S.Button2 onClick={postOtpHandler}>인증하기</S.Button2>
      </S.Wrapper>
      <S.Span color="red">{noticeFail}</S.Span>
    </S.SignInLayout>
  );
}
