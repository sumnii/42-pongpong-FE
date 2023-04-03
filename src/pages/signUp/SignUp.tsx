import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./style"

export default function signUp() {
  const navigate = useNavigate()
  const [idInput, setIdInput] = useState("")
  const [pwInput, setPwInput] = useState("")
  const [pwCheck, setPwCheck] = useState("")
  const [phoneInput, setPhoneInput] = useState("")
  const [phoneAuthInput, setPhoneAuthInput] = useState("")
  const [phoneAuthCheck, setPhoneAuthCheck] = useState("")
  const [formCheck, setFormCheck] = useState("")

  function onIdHandler(event) {
    setIdInput(event.target.value)
  }

  function onPwHandler(event) {
    setPwInput(event.target.value)
  }

  function onPwCheckHandler(event) {
    setPwCheck("패스워드가 일치하지 않습니다.")
    if (pwInput == event.target.value) {
      setPwCheck("패스워드가 일치합니다.")
    }
  }

  function onPhoneHandler(event) {
    setPhoneInput(event.target.value)
  }

  function sendPhoneAuthHandler(event) {
    if (phoneInput) {
      // 휴대폰 인증 번호 발송
    } else {
      setFormCheck("휴대폰번호를 입력해주세요")
    }
  }

  function onPhoneAuthHandler(event) {
    setPhoneAuthInput(event.target.value)
  }

  function checkPhoneAuthHandler(event) {
    const dummy = "123"
    if (phoneAuthInput) {
      if (phoneAuthInput === dummy) {
        setPhoneAuthCheck("인증완료")
      } else {
        setFormCheck("인증번호가 틀립니다")
      }
    } else {
      setFormCheck("인증번호을 입력해주세요")
    }
  }

  function isComplete() {
    if (idInput && pwCheck && phoneAuthCheck) {
      navigate("/signin")
    } else {
      if (!idInput) setFormCheck("아이디를 입력하세요")
      else if (!pwCheck) setFormCheck("패스워드를 확인해주세요")
      else if (!phoneAuthCheck) setFormCheck("휴대폰 인증을 해주세요")
    }
  }

  return (
    <S.SignInLayout>
      <h3>회원가입</h3>
      <form>
        <div>
          <input placeholder="아이디" required onChange={onIdHandler}></input>
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
          <input placeholder="휴대폰 번호" required onChange={onPhoneHandler}></input>
          <button type="button" onClick={sendPhoneAuthHandler}>
            인증번호 발송
          </button>
        </div>
        <div>
          <input placeholder="인증 번호" required onChange={onPhoneAuthHandler}></input>
          <button type="button" onClick={checkPhoneAuthHandler}>
            인증
          </button>
          <p>{phoneAuthCheck}</p>
        </div>
        <S.BtnWrapper>
          <button type="button" onClick={isComplete}>
            제출
          </button>
        </S.BtnWrapper>
      </form>
      <p>{formCheck}</p>
    </S.SignInLayout>
  )
}
