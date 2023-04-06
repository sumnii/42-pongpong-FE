import * as S from './style'

type modalProps = {
  sendFirst: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sendSecond: (e: React.FormEvent<HTMLFormElement>) => void;
  auth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: (e: boolean) => void;
}

function AuthModal(props: modalProps) {
  return (
    <>
      <S.Form onSubmit={props.sendSecond}>
        <div>
          <S.Button type="button" onClick={props.sendFirst}>인증번호 받기</S.Button>
        </div>
        <div>
          <input placeholder="인증번호" onChange={props.auth} required></input>
          <S.Button>확인</S.Button>
        </div>
      </S.Form>
    </>
  );
}

export default AuthModal