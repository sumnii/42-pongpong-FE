import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "@unauth/signIn/SignIn";
import NotFound from "pages/NotFound";
import * as S from "./style";
import UnauthHome from "./signIn/UnauthHome";

function Unauth() {
  return (
    <S.AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UnauthHome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </S.AppLayout>
  );
}

export default Unauth;
