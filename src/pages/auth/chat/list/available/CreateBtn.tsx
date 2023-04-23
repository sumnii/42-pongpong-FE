import { useState } from "react";
import CreateChatRoomModal from "modal/CreateChatRoomModal";
import Modal from "modal/layout/Modal";

export default function CreateChatRoom() {
  const [showModal, setShowModal] = useState(false);

  function showModalHandler() {
    setShowModal(true);
  }
  function closeModalHandler() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <Modal setView={closeModalHandler}>
          <CreateChatRoomModal close={closeModalHandler} />
        </Modal>
      )}
      <button onClick={showModalHandler}>새로만들기</button>
    </>
  );
}
