import { Dispatch, SetStateAction, useState } from "react";
import ChatRoomModal from "./modal/ChatRoomModal";
import Modal from "./modal/Modal";

type propsType = {
  setRoom: Dispatch<SetStateAction<number | undefined>>;
};

export default function CreateChatRoom(props: propsType) {
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
          <ChatRoomModal close={closeModalHandler} setRoom={props.setRoom} />
        </Modal>
      )}
      <button onClick={showModalHandler}>새로만들기</button>
    </>
  );
}
