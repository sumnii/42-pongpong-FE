import { useState } from "react";
import Modal from "modal/layout/Modal";

type ModalProps = {
  children: React.ReactElement
};

export default function useInviteGameModal() {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function InviteModal(props: ModalProps) {
    return (
      <Modal setView={onOpen}>
        {props.children}
      </Modal>
    );
  }

  return {
    InviteModal,
    isOpen,
    onOpen,
    onClose,
  };
}
