import { RiPingPongFill } from "react-icons/ri";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

export default function UnauthHome() {
  const navigate = useNavigate();

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
    </S.SignInLayout>
  );
}
