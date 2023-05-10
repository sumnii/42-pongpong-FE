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
import SignUp from "@unauth/signUp/SignUp";

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
  const [isSign, setIsSign] = useState("");
  const [accessToken, setAccessToken] = useState("");

  if (window.location.href === "http://localhost:5173/signin") {
    window.location.href =
      "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-db474dcca0aa0382fee3c57b7b5e984abdcb2dc9c3ede199b49f470b3fe1ca46&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fsignin&response_type=code";
      // "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-0e0972afe292c5b12a1e189ebcfda62cb15c020650af7197951d39fe9113d3fa&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fsignin&response_type=code";
  }

  const oauthQuery = useQuery({
    queryKey: ["login"],
    queryFn: () => {
      return auth.login(target);
    },
    enabled: !!target,
    onSuccess: (res) => {
      console.log(res);
      if (res?.status === 200) {
        if (res.data.status === "approved") {
          if (res.data.detail === "signup") {
            setIsSign("signup");
            setAccessToken(res.data.accessToken);
          } else {
            // 2차 인증 x
            if (setSigned) setSigned(true);
            setAuth({
              username: res.data.username,
              token: res.data.accessToken,
            });
            navigate("/")
          }
        } else if (res.data.status === "published") {
          console.log(res.data.intraId);
          setIsSign("2fa");
          setShowModal(true) //------------< 2차 인증 건너뜀
        }
      } else if (res?.status === 409) {
        alert("이미 접속중 입니다.")
        navigate("/");
      } else {
        console.log(res);
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

  // async function authFirstHandler() {
  //   const body = {
  //     username: idInput,
  //     password: pwInput,
  //   };
  //   const res = await auth.login(body);
  //   if (res && (res.status === 200 || res.status === 201)) {
  //     if (setSigned) setSigned(true);
  //     setAuth({
  //       username: idInput,
  //       token: res.data.accessToken,
  //     });
  //   } else if (res && res.status === 409) {
  //     setFormCheck("이미 접속 중인 아이디 입니다.");
  //   } else {
  //     console.log(res);
  //     setFormCheck("아이디 또는 패스워드를 확인해주세요.");
  //   }
  // }

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
    } else {
      console.log(res);
    }
  }
  // ------------------------------- TODO 함수명 수정하기
  switch (isSign) {
    case "2fa":
      return (
        <>
        {showModal && (<div>hi</div>)}
        </>
      );
    case "signup":
      return <SignUp accessToken={accessToken} />;
    default:
      return <LoadingCircle w={50} h={50} />;
  }
}
