import { useState } from "react";
import Modal from "modal/layout/Modal";

type ModalProps = {
  children: React.ReactElement;
  back?: string;
};

export default function useGameModal() {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function GameModal(props: ModalProps) {
    return (
      <Modal setView={onOpen} back={props.back}>
        {props.children}
      </Modal>
    );
  }

  return {
    GameModal,
    isOpen,
    onOpen,
    onClose,
  };
}
