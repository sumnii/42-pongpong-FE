import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./style"

export default function signUp() {
  const navigate = useNavigate()
  const [idInput, setIdInput] = useState("")
  const [idCheck, setIdCheck] = useState("")
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
        setPhoneAuthCheck("인증번호가 일치하지 않습니다.")
      }
    } else {
      setPhoneAuthCheck("인증번호을 입력해주세요.")
    }
  }

  function isComplete(event) {
    event.preventDefault()
    if (idInput && pwCheck === "패스워드가 일치합니다." && phoneAuthCheck === "인증완료") {
      navigate("/")
    } else {
      if (!idInput) setFormCheck("아이디를 입력하세요.")
      else if (!pwCheck) setFormCheck("패스워드를 확인해주세요.")
      else if (!phoneAuthCheck) setFormCheck("휴대폰 인증을 해주세요.")
    }
  }

  function onCheckIdHandler(event) {
    const dummy = "호호"
    if (idInput === dummy) {
      setIdCheck("아이디가 중복입니다.")
    } else {
			setIdCheck("")
		}
  }

  return (
    <S.SignInLayout onClick={onCheckIdHandler} onFocus={onCheckIdHandler}>
      <h3>회원가입</h3>
      <form>
        <div>
          <input placeholder="아이디" required onChange={onIdHandler}></input>
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
          <button onClick={isComplete}>제출</button>
        </S.BtnWrapper>
      </form>
      <p>{formCheck}</p>
    </S.SignInLayout>
  )
}
