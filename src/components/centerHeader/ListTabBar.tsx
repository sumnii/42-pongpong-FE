import { useLocation, useNavigate } from "react-router-dom"
import * as S from "./style"

export default function ListTabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <S.HeaderLayout>
      <S.HeaderBtn clicked={location.pathname === "/"} onClick={() => navigate("/")}>
        홈
      </S.HeaderBtn>
      <S.HeaderBtn
        clicked={location.pathname === "/chat/list"}
        onClick={() => navigate("/chat/list")}
      >
        채팅방 리스트
      </S.HeaderBtn>
      <S.HeaderBtn
        clicked={location.pathname === "/game/list"}
        onClick={() => navigate("/game/list")}
      >
        게임방 리스트
      </S.HeaderBtn>
    </S.HeaderLayout>
  )
}
