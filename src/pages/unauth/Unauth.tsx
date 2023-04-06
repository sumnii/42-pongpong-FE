import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "@unauth/signIn/SignIn";
import SignUp from "@unauth/signUp/SignUp";
import * as S from "./style";

function Unauth() {
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

export default Unauth;
