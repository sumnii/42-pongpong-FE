import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./style"
import axios from 'axios'

type eventChangeType = React.ChangeEvent<HTMLInputElement>
type eventClickType = React.MouseEvent<HTMLButtonElement>

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
  const [accessToken, setAccessToken] = useState("")

  function onIdHandler(event: eventChangeType) {
    setIdInput(event.target.value)
  }

  function onPwHandler(event: eventChangeType) {
    setPwInput(event.target.value)
  }

  function onPwCheckHandler(event: eventChangeType) {
    setPwCheck("패스워드가 일치하지 않습니다.")
    if (pwInput == event.target.value) {
      setPwCheck("패스워드가 일치합니다.")
    }
  }

  function onPhoneHandler(event: eventChangeType) {
    setPhoneInput(event.target.value)
  }

  function sendPhoneAuthHandler() {
    if (phoneInput) {
      axios.post("http://localhost:81/auth/get/otp/signup",
        {
          phonenumber: phoneInput
        }).then(function (res) {
          console.log(res)
          alert("인증번호를 보냈습니다.")
        }).catch(function (err) {
          console.log(err)
          alert("휴대폰 번호를 확인해주세요.")
        })
    } else {
      setFormCheck("휴대폰번호를 입력해주세요")
    }
  }

  function onPhoneAuthHandler(event: eventChangeType) {
    setPhoneAuthInput(event.target.value)
  }

  function checkPhoneAuthHandler() {
    if (phoneAuthInput) {
      axios.post("http://localhost:81/auth/check/otp/signup",
        {
          phonenumber: phoneInput,
          otp: phoneAuthInput
        }).then(function (res) {
          setPhoneAuthCheck("인증완료")
          setAccessToken(res.data.access_token)
          console.log(res)
        }).catch(function (err) {
          setPhoneAuthCheck("인증번호가 일치하지 않습니다.")
          console.log(err)
        })
    } else {
      setPhoneAuthCheck("인증번호을 입력해주세요.")
    }
  }

  function isComplete(event: eventClickType) {
    event.preventDefault()
    if (idInput && pwCheck === "패스워드가 일치합니다." && phoneAuthCheck === "인증완료") {
      axios.post("http://localhost:81/user/create",
        {
          username: idInput,
          password: pwInput,
          phonenumber: phoneInput
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        }).then(function (res) {
          alert("회원가입 완료되었습니다.")
          console.log(res)
          navigate("/")
        }).catch(function (err) {
          console.log(err)
        })
    } else {
      if (!idInput) setFormCheck("아이디를 입력해주세요.")
      else if (!pwCheck) setFormCheck("패스워드를 확인해주세요.")
      else if (!phoneAuthCheck) setFormCheck("휴대폰 인증을 해주세요.")
    }
  }

  function onCheckIdHandler() {
    axios.get("http://localhost:81/auth/exist/" + idInput)
      .then(function (res) {
        const isDupl: boolean = res.data.status;
        if (isDupl) {
          setIdCheck("이미 존재하는 아이디입니다.")
        } else {
          setIdCheck("사용 가능한 아이디입니다.")
        }
      }).catch(function (err) {
        console.log(err)
      })
  }

  return (
    <S.SignInLayout>
      <h3>회원가입</h3>
      <form>
        <div>
          <input placeholder="아이디" required onChange={onIdHandler}></input>
          <button type="button" onClick={onCheckIdHandler}>중복확인</button>
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
