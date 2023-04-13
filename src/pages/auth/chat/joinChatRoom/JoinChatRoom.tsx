import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { useState } from "react";
import { joinChatRoom } from "ws/chat";
import Modal from "./modal/Modal";
import PassWdModal from "./modal/PassWdModal";

type PropsType = {
  no: string | number;
  status?: string;
  myChat?: boolean;
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
    if (props.myChat) {
      navigate(`/chat/${props.no}`);
    } else {
      joinChatRoom(props.no, navigate);
    }
  }
  return (
    <>
      {showModal && (
        <Modal setView={closeModalHandler}>
          <PassWdModal close={closeModalHandler} no={props.no} navigateFn={navigate} />
        </Modal>
      )}
      <S.EntryBtn
        onClick={
          props.status !== "protected" ? joinHandler : props.myChat ? joinHandler : showModalHandler
        }
      >
        참가
      </S.EntryBtn>
    </>
  );
}
