import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@hooks/AuthContext";
import * as S from "./style"
import axios from 'axios'
import AuthModal from './AuthModal'
import Modal from './Modal'

type eventChangeType = React.ChangeEvent<HTMLInputElement>;
type eventClickType = React.MouseEvent<HTMLButtonElement>;
type eventFormType = React.FormEvent<HTMLFormElement>;

export default function signIn() {
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [formCheck, setFormCheck] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [authInput, setAuthInput] = useState("");

  const authDispatch = useContext(AuthContext)?.authDispatch;

  function onIdHandler(event: eventChangeType) {
    setIdInput(event.target.value);
    if (formCheck) setFormCheck("");
    if (showInput) setShowInput(false);
  }
  function onPwHandler(event: eventChangeType) {
    setPwInput(event.target.value);
    if (formCheck) setFormCheck("");
    if (showInput) setShowInput(false);
  }
  function isComplete(event: eventClickType) {
    event.preventDefault();
    if (idInput && pwInput) {
      authFirstHandler();
    } else {
      if (!idInput) setFormCheck("아이디를 입력해주세요.");
      else if (!pwInput) setFormCheck("패스워드를 입력해주세요.");
    }
  }
  function authFirstHandler() {
    axios
      .post("/auth/login", {
        username: idInput,
        password: pwInput,
      })
      .then(function (res) {
        setAccessToken(res.data.accessToken);
        console.log(res);
        // setShowInput(true) ------------< 2차 인증 건너뜀
        authDispatch &&
          authDispatch({
            type: "signIn",
            username: idInput,
            token: res.data.accessToken,
          });
      })
      .catch(function (err) {
        if (err.response) console.log(err.response);
        setFormCheck("아이디 또는 패스워드를 확인해주세요.");
      });
  }
  function authSecondHandler(e: eventFormType) {
    e.preventDefault();
    axios
      .post(
        "/auth/check/otp/login",
        {
          otp: authInput,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        },
      )
      .then(function (res) {
        console.log(res);
        alert("로그인되었습니다");
        authDispatch &&
          authDispatch({
            type: "signIn",
            username: idInput,
            token: res.data.accessToken,
          });
      })
      .catch(function (err) {
        console.log(err);
        console.log(authInput);
        alert("인증번호가 틀렸습니다. 다시 시도해주세요");
      });
  }
  function onAuthHandler(e: eventChangeType) {
    setAuthInput(e.target.value)
  }
  function sendAuthHandler() {
    axios
      .get("/auth/get/otp/login", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
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
          <button onClick={isComplete}>로그인</button>
          <button
            type="button"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            회원가입
          </button>
        </S.BtnWrapper>
      </form>
      <span>{formCheck}</span>
      {
        showInput &&
        <Modal setView={() => setShowInput(false)}>
          <AuthModal
          sendFirst={sendAuthHandler}
          sendSecond={authSecondHandler}
          auth={onAuthHandler}
          show={setShowInput} />
        </Modal>
      }
    </S.SignInLayout>
  );
}
