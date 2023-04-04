import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./style"

type signProps = {
	setSignTo: (sign: boolean) => void;
}
type eventChangeType = React.ChangeEvent<HTMLInputElement>
type eventClickType = React.MouseEvent<HTMLButtonElement>


export default function signIn({ setSignTo }: signProps) {
  const navigate = useNavigate()
  const [idInput, setIdInput] = useState("")
  const [pwInput, setPwInput] = useState("")
  const [formCheck, setFormCheck] = useState("")

  function onIdHandler(event: eventChangeType) {
    setIdInput(event.target.value)
  }
  function onPwHandler(event: eventChangeType) {
    setPwInput(event.target.value)
  }
  function isComplete(event: eventClickType) {
    event.preventDefault()
    if (idInput && pwInput) {
      setSignTo(true)
      navigate("/")
    } else {
      if (!idInput) setFormCheck("아이디를 입력해주세요.")
      else if (!pwInput) setFormCheck("패스워드를 입력해주세요.")
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
          <button onClick={isComplete}>
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
