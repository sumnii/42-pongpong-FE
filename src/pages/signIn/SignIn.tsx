import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./style"

export default function signIn() {
  const navigate = useNavigate()
  const [idInput, setIdInput] = useState("")
  const [pwInput, setPwInput] = useState("")
  const [formCheck, setFormCheck] = useState("")

  function onIdHandler(event) {
    setIdInput(event.target.value)
  }
  function onPwHandler(event) {
    setPwInput(event.target.value)
  }
  function isComplete() {
    if (idInput && pwInput) {
      navigate("/")
    } else {
      if (!idInput) setFormCheck("아이디를 입력해주세요")
      else if (!pwInput) setFormCheck("패스워드를 입력해주세요")
    }
  }

  return (
    <S.SignInLayout>
      <h1>hello pongpong</h1>
      <form>
        <div>
          <input placeholder="ID" required onChange={onIdHandler}></input>
        </div>
        <div>
          <input placeholder="Password" required onChange={onPwHandler} type="password"></input>
        </div>
        <S.BtnWrapper>
          <button type="button" onClick={isComplete}>
            로그인
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/signUp")
            }}
          >
            회원가입
          </button>
        </S.BtnWrapper>
      </form>
      <span>{formCheck}</span>
    </S.SignInLayout>
  )
}
