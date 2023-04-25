import { useState } from "react";
import { ModalOverlay } from "modal/layout/style";

type ModalProps = {
  children: React.ReactNode;
};

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function Modal({ children }: ModalProps) {
    return (
      <>
        <ModalOverlay />
        {children}
      </>
    );
  }

  return {
    Modal,
    isOpen,
    onOpen,
    onClose,
  };
}
