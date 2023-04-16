import { Dispatch, SetStateAction, useState } from "react";
import ChatRoomModal from "./modal/ChatRoomModal";
import Modal from "./modal/Modal";

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
          <ChatRoomModal close={closeModalHandler}/>
        </Modal>
      )}
      <button onClick={showModalHandler}>새로만들기</button>
    </>
  );
}
