import { useNavigate } from "react-router-dom"

export default function ListTabBar() {
  const navigate = useNavigate()

  return (
    <>
      <button onClick={() => navigate("/")}>홈</button>
      <button onClick={() => navigate("/chat/list")}>채팅방</button>
      <button onClick={() => navigate("/game/list")}>게임방</button>
    </>
  )
}
