import { RiPingPongFill } from "react-icons/ri";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { isAuth, setAuth } from "userAuth";
import { AuthContext } from "hooks/context/AuthContext";

export default function UnauthHome() {
  const navigate = useNavigate();
  const [input, setInput] = useState(""); // 테스트용
  const setSigned = useContext(AuthContext);
  // 테스트용
  const onInputHandler = (e: any) => {
    setInput(e.target.value);
  };

  //테스트용

  const testCreateUserHandler = async () => {
    const res = await axios.get(`http://localhost:81/user/create/test`);
    console.log(res);
  }
  const testLoginHandler = async () => {
    const res = await axios.post(`http://localhost:81/auth/login/test`, {
      username: input,
    });
    if(setSigned) setSigned(true);
    setAuth({
      username: input,
      token: res.data.accessToken
    })
    console.log(res);
    navigate("/");
  };

  const startHandler = () => {
    navigate("/signin");
  };

  return (
    <S.SignInLayout>
      <S.FormLogo>
        <RiPingPongFill size={55} />
      </S.FormLogo>
      <h1>hello pongpong</h1>
      <S.BtnWrapper>
        <S.Button onClick={startHandler}>시작하기</S.Button>
      </S.BtnWrapper>
      <S.BtnWrapper>
        <S.Button onClick={testCreateUserHandler}>테스트용 아이디만들기</S.Button>
        <S.Input onChange={onInputHandler} />
        <S.Button onClick={testLoginHandler}>테스트용 로그인</S.Button>
      </S.BtnWrapper>
    </S.SignInLayout>
  );
}
