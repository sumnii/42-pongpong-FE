import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "@signIn/SignIn"
import SignUp from "@signUp/SignUp"
import * as S from "./style"

type signProps = {
	setSign: (sign: boolean) => void;
}

function unAuth({ setSign }: signProps) {
  return (
    <S.AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn setSignTo={setSign}/>} />
          <Route path="/signup" element={<SignUp />} />
          {/* TODO: 경로 일치하지 않으면 404 NON FOUND 페이지 */}
        </Routes>
      </BrowserRouter>
    </S.AppLayout>
  )
}

export default unAuth
