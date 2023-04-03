import { useNavigate } from "react-router-dom"
import * as S from "./style"

interface GameItemProps {
  no: string | number
  p1: string
  p2: string
  p1Score: string | number
  p2Score: string | number
  disabled?: boolean
}

export default function GameItem(props: GameItemProps) {
  const navigate = useNavigate()

  return (
    <>
      <S.No>{props.no}</S.No>
      <S.Player left>{props.p1}</S.Player>
      <S.Versus>vs</S.Versus>
      <S.Player>{props.p2}</S.Player>
      <S.Score left>{props.p1Score}</S.Score>
      <S.Versus>:</S.Versus>
      <S.Score>{props.p2Score}</S.Score>
      {props.disabled ? (
        <S.EntryBtn disabled />
      ) : (
        <S.EntryBtn onClick={() => navigate(`/game/${props.no}`)}>관전</S.EntryBtn>
      )}
    </>
  )
}
