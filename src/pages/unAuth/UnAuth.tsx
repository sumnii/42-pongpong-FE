import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "@unAuth/signIn/SignIn";
import SignUp from "@unAuth/signUp/SignUp";
import * as S from "./style";

function unAuth() {
  return (
    <S.AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* TODO: 경로 일치하지 않으면 404 NON FOUND 페이지 */}
        </Routes>
      </BrowserRouter>
    </S.AppLayout>
  );
}

export default unAuth;
