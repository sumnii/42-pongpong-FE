import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { useState } from "react";
import { joinChatRoom } from "socket/chat";
import Modal from "./modal/Modal";
import PassWdModal from "./modal/PassWdModal";

type PropsType = {
  no: string | number;
  status?: string;
  roomId: string | number | undefined;
};

export default function JoinChatRoom(props: PropsType) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  function joinHandler() {
    joinChatRoom(props.no, props.roomId, navigate);
  }
  return (
    <>
      {showModal && (
        <Modal setView={closeModalHandler}>
          <PassWdModal
            close={closeModalHandler}
            no={props.no}
            navigateFn={navigate}
            room={props.roomId}
          />
        </Modal>
      )}
      <S.EntryBtn onClick={props.status !== "protected" ? joinHandler : showModalHandler}>
        참가
      </S.EntryBtn>
    </>
  );
}
