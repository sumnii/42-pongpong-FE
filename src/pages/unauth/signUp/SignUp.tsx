import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@hooks/AuthContext";
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
  const [pwCheck, setPwCheck] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneAuthInput, setPhoneAuthInput] = useState("");
  const [sendAuthBtn, setSendAuthBtn] = useState(false);
  // 테스트중 2차 인증 생략
  const [phoneAuthCheck, setPhoneAuthCheck] = useState("인증완료");
  const [checkAuthBtn, setCheckAuthBtn] = useState(true);
  const [formCheck, setFormCheck] = useState("");

  const authDispatch = useContext(AuthContext)?.authDispatch;

  function onIdHandler(event: eventChangeType) {
    setIdInput(event.target.value);
    if (formCheck) setFormCheck("");
    if (idCheck) setIdCheck("");
  }

  function onPwHandler(event: eventChangeType) {
    setPwInput(event.target.value);
    if (formCheck) setFormCheck("");
    if (pwCheck) setPwCheck("");
  }

  function onPwCheckHandler(event: eventChangeType) {
    setPwCheck("패스워드가 일치하지 않습니다.");
    if (pwInput == event.target.value) {
      setPwCheck("패스워드가 일치합니다.");
    }
  }

  function onPhoneHandler(event: eventChangeType) {
    setPhoneInput(event.target.value);
  }

  function onPhoneAuthHandler(event: eventChangeType) {
    setPhoneAuthInput(event.target.value);
  }

  async function sendPhoneAuthHandler() {
    if (phoneInput) {
      const res = await auth.getOtpSignUp(phoneInput);
      if (res && (res.status === 200 || res.status === 201)) {
        console.log(res);
        alert("인증번호를 보냈습니다.");
        setSendAuthBtn(true);
      } else {
        console.log(res);
        alert("휴대폰 번호를 확인해주세요.");
      }
    } else {
      setPhoneAuthCheck("휴대폰번호를 입력해주세요.");
    }
  }

  async function checkPhoneAuthHandler() {
    if (phoneAuthInput) {
      const body = {
        phonenumber: phoneInput,
        otp: phoneAuthInput
      };
      const res = await auth.checkOtpSignUp(body);
      if (res && (res.status === 200 || res.status === 201)) {
        setPhoneAuthCheck("인증완료");
        authDispatch &&
          authDispatch({
            type: "getToken",
            token: res.data.accessToken,
          });
        setCheckAuthBtn(true);
        console.log(res);
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
      pwCheck === "패스워드가 일치합니다." &&
      phoneAuthCheck === "인증완료"
    ) {
      const userInfo: user.userInfoType = {
        username: idInput,
        password: pwInput,
        phonenumber: phoneInput,
      }
      const res = await user.create(userInfo)
      if (res && (res.status === 200 || res.status === 201)) {
        alert("회원가입 완료되었습니다.");
        console.log(res);
        navigate("/");
      } else {
        console.log(res)
      }
    } else {
      if (!(idCheck === "사용 가능한 아이디입니다.")) setFormCheck("아이디를 확인해주세요.");
      else if (!(pwCheck === "패스워드가 일치합니다.")) setFormCheck("패스워드를 확인해주세요.");
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
    <S.SignInLayout>
      <h3>회원가입</h3>
      <form>
        <div>
          <input placeholder="아이디" required onChange={onIdHandler}></input>
          <button type="button" onClick={onCheckIdHandler}>
            중복확인
          </button>
          <p>{idCheck}</p>
        </div>
        <div>
          <input placeholder="패스워드" required type="password" onChange={onPwHandler}></input>
        </div>
        <div>
          <input
            placeholder="패스워드 확인"
            required
            type="password"
            onChange={onPwCheckHandler}
          ></input>
          <p>{pwCheck}</p>
        </div>
        <div>
          <input
            placeholder="휴대폰 번호"
            required
            onChange={onPhoneHandler}
            disabled={sendAuthBtn}
          ></input>
          <button type="button" onClick={sendPhoneAuthHandler} disabled={sendAuthBtn}>
            인증번호 받기
          </button>
        </div>
        <div>
          <input
            placeholder="인증 번호"
            required
            onChange={onPhoneAuthHandler}
            disabled={checkAuthBtn}
          ></input>
          <button type="button" onClick={checkPhoneAuthHandler} disabled={checkAuthBtn}>
            인증
          </button>
          <p>{phoneAuthCheck}</p>
        </div>
        <S.BtnWrapper>
          <button onClick={isComplete}>제출</button>
        </S.BtnWrapper>
      </form>
      <p>{formCheck}</p>
    </S.SignInLayout>
  );
}
