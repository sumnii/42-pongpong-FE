import * as S from '../style';
import { GrSecure } from "react-icons/gr";

type modalProps = {
  sendFirst: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sendSecond: (e: React.FormEvent<HTMLFormElement>) => void;
  auth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: (e: boolean) => void;
}

function AuthModal(props: modalProps) {
  return (
    <S.SignInLayout>
      <form onSubmit={props.sendSecond}>
        <S.FormLogo>
          <GrSecure size={55} />
        </S.FormLogo>
        <div>
          <S.ModalButton type="button" onClick={props.sendFirst}>인증번호 받기</S.ModalButton>
          <S.BtnWrapper>
            <S.Input placeholder="인증번호" onChange={props.auth} required></S.Input>
            <S.ModalButton>확인</S.ModalButton>
          </S.BtnWrapper>
        </div>
      </form>
    </S.SignInLayout>
  );
}

export default AuthModal