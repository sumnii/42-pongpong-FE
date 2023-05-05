import { createPortal } from "react-dom";
import * as S from "./style"

type modalProps = {
  children: React.ReactElement
  setView: (e: React.MouseEvent<HTMLDivElement>) => void;
  set?: string;
}

export default function Modal(props: modalProps) {
  const modalRoot = document.getElementById("modal-root");
  return createPortal(
    <>
      <S.Backdrop onClick={props.setView} />
      <S.Modal id={props.set} open>
        {props.children}
      </S.Modal>
    </>, modalRoot as Element
  )
}