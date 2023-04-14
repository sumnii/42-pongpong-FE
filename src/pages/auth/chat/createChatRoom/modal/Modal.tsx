import * as S from "./style"

type modalProps = {
  children: React.ReactElement
  setView: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Modal1(props: modalProps) {
  return (
    <>
      <S.Backdrop onClick={props.setView}/>
      <S.Modal open>
        {props.children}
      </S.Modal>
    </>
  )
}