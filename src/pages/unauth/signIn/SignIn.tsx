import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "userAuth";
import AuthModal from "./modal/AuthModal";
import Modal from "./modal/Modal";
import * as auth from "api/auth";
import { RiPingPongFill } from "react-icons/ri";
import { AuthContext } from "hooks/context/AuthContext";
import * as S from "./style";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingCircle from "components/LoadingCircle";

type eventChangeType = React.ChangeEvent<HTMLInputElement>;
type eventClickType = React.MouseEvent<HTMLButtonElement>;
type eventFormType = React.FormEvent<HTMLFormElement>;

export default function signIn() {
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [formCheck, setFormCheck] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [authInput, setAuthInput] = useState("");
  const setSigned = useContext(AuthContext);
  const target = window.location.search.split("=")[1];

  if (window.location.href === "http://localhost:5173/") {
    window.location.href =
      "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-db474dcca0aa0382fee3c57b7b5e984abdcb2dc9c3ede199b49f470b3fe1ca46&redirect_uri=http%3A%2F%2Flocalhost%3A5173&response_type=code";
  }

  const oauthQuery = useQuery({
    queryKey: ["oauth"],
    queryFn: () => {
      
      console.log(target);
      return auth.oauth(target);
    },
    enabled: !!target,
    onSuccess: (res) => {
      console.log(res);
      if (res?.status === 200) {
        if (res.data.status === false) {
          navigate(`/signup/?${res.data.intraId}`);
        }
      } else {
        return <LoadingCircle w={50} h={50} />;
      }
    },
  });

  const keyDownHandler = (e: KeyboardEvent) => {
    e.stopPropagation();
    if ((e.metaKey && e.key === "r") || e.key === "F5") {
      history.replaceState({}, "", location.pathname);
      location.reload();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);
    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
    };
  }, []);

  if (oauthQuery.isLoading) return <LoadingCircle w={50} h={50} />;

  function onIdHandler(event: eventChangeType) {
    setIdInput(event.target.value);
    if (formCheck) setFormCheck("");
    if (showModal) setShowModal(false);
  }

  function onPwHandler(event: eventChangeType) {
    setPwInput(event.target.value);
    if (formCheck) setFormCheck("");
    if (showModal) setShowModal(false);
  }

  function onAuthHandler(e: eventChangeType) {
    setAuthInput(e.target.value);
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

  async function authFirstHandler() {
    const body = {
      username: idInput,
      password: pwInput,
    };
    const res = await auth.login(body);
    if (res && (res.status === 200 || res.status === 201)) {
      // setShowModal(true) //------------< 2차 인증 건너뜀
      if (setSigned) setSigned(true);
      setAuth({
        username: idInput,
        token: res.data.accessToken,
      });
    } else if (res && res.status === 409) {
      setFormCheck("이미 접속 중인 아이디 입니다.");
    } else {
      console.log(res);
      setFormCheck("아이디 또는 패스워드를 확인해주세요.");
    }
  }

  async function sendAuthHandler() {
    const res = await auth.getOtpLogin();
    if (res && (res.status === 200 || res.status === 201)) {
      console.log(res);
    } else {
      console.log(res);
    }
  }

  async function authSecondHandler(e: eventFormType) {
    e.preventDefault();
    const res = await auth.checkOtpLogin(authInput);
    if (res && (res.status === 200 || res.status === 201)) {
      if (setSigned) setSigned(true);
      setAuth({
        username: idInput,
        token: res.data.accessToken,
      });
      // authDispatch &&
      //   authDispatch({
      //     type: "signIn",
      //     username: idInput,
      //     token: res.data.accessToken,
      //   });
    } else {
      console.log(res);
    }
  }
  // ------------------------------- TODO 함수명 수정하기
  return (
    <S.SignInLayout>
      <div className="signInContainer">
        {showModal && (
          <Modal setView={() => setShowModal(false)}>
            <AuthModal
              sendFirst={sendAuthHandler}
              sendSecond={authSecondHandler}
              auth={onAuthHandler}
            />
          </Modal>
        )}
        <form>
          <S.FormLogo>
            <RiPingPongFill size={55} />
          </S.FormLogo>
          <div className="form-main">
            <h1>hello pongpong</h1>
            <div>
              <S.Input placeholder="ID" onChange={onIdHandler} autoFocus></S.Input>
            </div>
            <div>
              <S.Input
                placeholder="Password"
                required
                onChange={onPwHandler}
                type="password"
              ></S.Input>
            </div>
            <S.Span>{formCheck}</S.Span>
            <S.BtnWrapper>
              <S.Button onClick={isComplete}>로그인</S.Button>
              {/* <S.Button
                type="button"
                onClick={() => {
                  navigate("/signUp");
                }}
              >
                회원가입
              </S.Button> */}
            </S.BtnWrapper>
          </div>
        </form>
      </div>
    </S.SignInLayout>
  );
}
