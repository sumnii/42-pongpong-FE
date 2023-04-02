import React from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./style"

export default function signUp() {
  const navigate = useNavigate()

  return (
    <S.SignInLayout>
      <h3>회원가입</h3>
      <form>
        <div>
          <input placeholder="아이디" required></input>
        </div>
        <div>
          <input placeholder="패스워드" required type="password"></input>
        </div>
        <div>
          <input placeholder="패스워드 확인" required type="password"></input>
        </div>
        <div>
          <input placeholder="휴대폰 번호" required></input>{" "}
          <button type="button">인증번호 발송</button>
        </div>
        <div>
          <input placeholder="인증 번호" required></input> <button type="button">인증</button>
        </div>
        <S.BtnWrapper>
          <button type="button">제출</button>
        </S.BtnWrapper>
      </form>
    </S.SignInLayout>
  )
}
