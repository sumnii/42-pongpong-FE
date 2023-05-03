import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "hooks/context/AuthContext";
import * as S from "./style";
import * as user from "api/user";
import * as auth from "api/auth";

type eventChangeType = React.ChangeEvent<HTMLInputElement>;
type eventClickType = React.MouseEvent<HTMLButtonElement>;

export default function signUp() {
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState("");
  const [idCheck, setIdCheck] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [pwRuleCheck, setPwRuleCheck] = useState("");
  const [pwMatchCheck, setPwMatchCheck] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneAuthInput, setPhoneAuthInput] = useState("");
  const [sendAuthBtn, setSendAuthBtn] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState("");
  // 테스트중 2차 인증 생략
  const [phoneAuthCheck, setPhoneAuthCheck] = useState("인증완료");
  const [checkAuthBtn, setCheckAuthBtn] = useState(true);
  const [formCheck, setFormCheck] = useState("");

  const passwdRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  function onIdHandler(event: eventChangeType) {
    setIdInput(event.target.value);
    if (formCheck) setFormCheck("");
    if (idCheck) setIdCheck("");
  }

  function onPwHandler(event: eventChangeType) {
    setPwInput(event.target.value);
    // TEST: 테스트 기간동안 주석 처리 / 패스워드 정책 확인
    if (event.target.value === "") setPwRuleCheck("");
    else if (passwdRegExp.test(event.target.value)) setPwRuleCheck("");
    else setPwRuleCheck("영문, 숫자, 특수문자 조합으로 8자 이상 입력해주세요.");

    if (formCheck) setFormCheck("");
    if (pwMatchCheck) setPwMatchCheck("");
  }

  function onPwMatchCheckHandler(event: eventChangeType) {
    setPwMatchCheck("패스워드가 일치하지 않습니다.");
    if (pwInput == event.target.value) {
      setPwMatchCheck("패스워드가 일치합니다.");
    }
  }

  function onPhoneHandler(event: eventChangeType) {
    setPhoneInput(event.target.value);
    if (phoneCheck) setPhoneCheck("");
  }

  function onPhoneAuthHandler(event: eventChangeType) {
    setPhoneAuthInput(event.target.value);
  }

  async function sendPhoneAuthHandler() {
    if (phoneInput) {
      const res = await auth.getOtpSignUp(phoneInput);
      if (res && (res.status === 200 || res.status === 201)) {
        setPhoneCheck("인증번호를 보냈습니다.");
        setSendAuthBtn(true);
      } else {
        setPhoneCheck("휴대폰 번호를 확인해주세요.");
      }
    } else {
      setPhoneCheck("휴대폰번호를 입력해주세요.");
    }
  }

  async function checkPhoneAuthHandler() {
    if (phoneAuthInput) {
      const body = {
        phonenumber: phoneInput,
        otp: phoneAuthInput,
      };
      const res = await auth.checkOtpSignUp(body);
      if (res && (res.status === 200 || res.status === 201)) {
        setPhoneAuthCheck("인증완료");
        // authDispatch &&
        //   authDispatch({
        //     type: "getToken",
        //     token: res.data.accessToken,
        //   });
        setCheckAuthBtn(true);
      } else {
        setPhoneAuthCheck("인증번호가 일치하지 않습니다.");
        console.log(res);
      }
    } else {
      setPhoneAuthCheck("인증번호을 입력해주세요.");
    }
  }

  async function isComplete(event: eventClickType) {
    event.preventDefault();
    if (
      idCheck === "사용 가능한 아이디입니다." &&
      pwMatchCheck === "패스워드가 일치합니다." &&
      phoneAuthCheck === "인증완료"
    ) {
      const userInfo: user.userInfoType = {
        username: idInput,
        password: pwInput,
        phonenumber: phoneInput,
      };
      const res = await user.create(userInfo);
      if (res && (res.status === 200 || res.status === 201)) {
        alert("회원가입 완료되었습니다.");
        navigate("/");
      } else {
        console.log(res);
      }
    } else {
      if (!(idCheck === "사용 가능한 아이디입니다.")) setFormCheck("아이디를 확인해주세요.");
      else if (!(pwMatchCheck === "패스워드가 일치합니다."))
        setFormCheck("패스워드를 확인해주세요.");
      else if (!(phoneAuthCheck === "인증완료")) setFormCheck("휴대폰 인증을 해주세요.");
    }
  }

  async function onCheckIdHandler() {
    if (!idInput) {
      setIdCheck("아이디를 입력해주세요.");
    } else {
      const res = await auth.existUsername(idInput);
      if (res && (res.status === 200 || res.status === 201)) {
        const isUsing: boolean = res.data.status;
        if (isUsing) setIdCheck("이미 존재하는 아이디입니다.");
        else setIdCheck("사용 가능한 아이디입니다.");
      } else {
        console.log(res);
      }
    }
  }

  return (
    <S.SignUpLayout>
      <div className="signUpContainer">
        <form>
          <div className="form-main">
            <h2>회원가입</h2>
            <S.InputArea>
              <S.BtnWrapper>
                <S.Input placeholder="아이디" maxLength={10} onChange={onIdHandler}></S.Input>
                <S.Button type="button" onClick={onCheckIdHandler}>
                  중복확인
                </S.Button>
              </S.BtnWrapper>
              <S.Span color={idCheck === "사용 가능한 아이디입니다." ? "green" : "red"}>
                {idCheck}
              </S.Span>
            </S.InputArea>
            <S.InputArea>
              <S.BtnWrapper>
                <S.Input1
                  placeholder="패스워드"
                  required
                  type="password"
                  onChange={onPwHandler}
                ></S.Input1>
              </S.BtnWrapper>
              <S.Span color="red">{pwRuleCheck}</S.Span>
            </S.InputArea>
            <S.InputArea>
              <S.BtnWrapper>
                <S.Input1
                  placeholder="패스워드 확인"
                  required
                  type="password"
                  onChange={onPwMatchCheckHandler}
                ></S.Input1>
              </S.BtnWrapper>
              <S.Span color={pwMatchCheck === "패스워드가 일치합니다." ? "green" : "red"}>
                {pwMatchCheck}
              </S.Span>
            </S.InputArea>
            <S.InputArea>
              <S.BtnWrapper>
                <S.Input
                  placeholder="휴대폰 번호"
                  required
                  onChange={onPhoneHandler}
                  disabled={sendAuthBtn}
                ></S.Input>
                <S.Button type="button" onClick={sendPhoneAuthHandler} disabled={sendAuthBtn}>
                  인증번호 받기
                </S.Button>
              </S.BtnWrapper>
              <S.Span color={phoneCheck === "인증번호를 보냈습니다." ? "green" : "red"}>
                {phoneCheck}
              </S.Span>
            </S.InputArea>
            <S.InputArea>
              <S.BtnWrapper>
                <S.Input
                  placeholder="인증 번호"
                  required
                  onChange={onPhoneAuthHandler}
                  disabled={checkAuthBtn}
                ></S.Input>
                <S.Button type="button" onClick={checkPhoneAuthHandler} disabled={checkAuthBtn}>
                  인증
                </S.Button>
              </S.BtnWrapper>
              <S.Span color={phoneAuthCheck === "인증완료" ? "green" : "red"}>
                {phoneAuthCheck}
              </S.Span>
            </S.InputArea>
            <S.BtnWrapper>
              <S.Button1 onClick={isComplete}>확인</S.Button1>
            </S.BtnWrapper>
          </div>
        </form>
        <S.Span color="red">{formCheck}</S.Span>
      </div>
    </S.SignUpLayout>
  );
}
