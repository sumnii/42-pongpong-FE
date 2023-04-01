import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

export default function signIn() {
	const navigate = useNavigate();

  return (
		<S.SignInLayout>
			<h1>hello pongpong</h1>
			<form>
				<div>
					<input placeholder="ID"></input>
				</div>
				<div>
					<input placeholder="Password" required type="password"></input>
				</div>
				<S.BtnWrapper>
					<button onClick={() => {
						navigate('/');
					}}
					>
						로그인
					</button>
					<button onClick={() => {
						navigate('/signUp');
					}}
					>
						회원가입
					</button>
				</S.BtnWrapper>
			</form>
		</S.SignInLayout>
  );
}
