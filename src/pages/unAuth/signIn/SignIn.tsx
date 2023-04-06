import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./style"
import axios from 'axios'

type signProps = {
  setSignTo: (sign: boolean) => void;
}
type eventChangeType = React.ChangeEvent<HTMLInputElement>
type eventClickType = React.MouseEvent<HTMLButtonElement>
type eventFormType = React.FormEvent<HTMLFormElement>

export default function signIn({ setSignTo }: signProps) {
  const navigate = useNavigate()
  const [idInput, setIdInput] = useState("")
  const [pwInput, setPwInput] = useState("")
  const [formCheck, setFormCheck] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [showInput, setShowInput] = useState(false)
  const [authInput, setAuthInput] = useState("")

  function onIdHandler(event: eventChangeType) {
    setIdInput(event.target.value)
    if (formCheck) setFormCheck("")
    if (showInput) setShowInput(false)
  }
  function onPwHandler(event: eventChangeType) {
    setPwInput(event.target.value)
    if (formCheck) setFormCheck("")
    if (showInput) setShowInput(false)
  }
  function isComplete(event: eventClickType) {
    event.preventDefault()
    if (idInput && pwInput) {
      authFirstHandler()
    } else {
      if (!idInput) setFormCheck("아이디를 입력해주세요.")
      else if (!pwInput) setFormCheck("패스워드를 입력해주세요.")
    }
  }
  function authFirstHandler() {
    axios.post("http://localhost:81/auth/login",
      {
        username: idInput,
        password: pwInput
      }
    ).then(function (res) {
      setAccessToken(res.data.accessToken)
      console.log(res)
      // setShowInput(true) ------------< 2차 인증 건너뜀
      setSignTo(true)
    })
      .catch(function (err) {
        console.log(err.response.statusText)
        setFormCheck("아이디 또는 패스워드를 확인해주세요.")
      })
  }
  function authSecondHandler(e: eventFormType) {
    e.preventDefault()
    axios.post("http://localhost:81/auth/check/otp/login",
      {
        otp: authInput
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }).then(function (res) {
        console.log(res)
        alert("로그인되었습니다")
        setSignTo(true)
      }).catch(function (err) {
        console.log(err)
        console.log(authInput)
        alert("인증번호가 틀렸습니다. 다시 시도해주세요")
      })
  }
  function onInputHandler(e: eventChangeType) {
    setAuthInput(e.target.value)
  }
  function sendAuthHandler() {
    axios.get("http://localhost:81/auth/get/otp/login",
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }).then(function (res) {
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
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
      {showInput &&
        (<form onSubmit={authSecondHandler}>
          <button type="button" onClick={sendAuthHandler}>휴대폰 인증번호 받기</button>
          <span>인증번호를 입력하세요</span>
          <input required onChange={onInputHandler}></input>
          <button>확인</button>
        </form>
        )}
    </S.SignInLayout>
  )
}
