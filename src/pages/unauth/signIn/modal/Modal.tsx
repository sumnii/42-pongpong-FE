import * as S from "../style"

type modalProps = {
  children: React.ReactElement
  setView: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Modal(props: modalProps) {
  return (
    <>
      <S.Backdrop onClick={props.setView}/>
      <S.Modal open>
        {props.children}
      </S.Modal>
    </>
  )
}

export default Modal