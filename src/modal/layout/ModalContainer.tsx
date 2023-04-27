import { createPortal } from "react-dom";

type ChildrenProps = {
  children: React.ReactNode;
};

export default function ModalContainer({ children }: ChildrenProps) {
  const modalRoot = document.getElementById("modal-root");
  return createPortal(<div>{children}</div>, modalRoot as Element);
}
