import { useState } from "react";
import { ModalOverlay } from "modal/layout/style";
import ModalContainer from "modal/layout/ModalContainer";

type ModalProps = {
  children: React.ReactNode;
};

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose(e: MouseEvent) {
    e.stopPropagation();
    setIsOpen(false);
  }

  function Modal({ children }: ModalProps) {
    return (
      <ModalContainer>
        <ModalOverlay />
        {children}
      </ModalContainer>
    );
  }

  return {
    Modal,
    isOpen,
    onOpen,
    onClose,
  };
}
