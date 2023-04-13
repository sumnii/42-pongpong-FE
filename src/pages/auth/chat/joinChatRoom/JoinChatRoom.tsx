import { useNavigate } from "react-router-dom";
import { getSocket } from "socket/socket";
import * as S from "./style";
import { useState } from "react";
import ChatRoomModal from "./modal/ChatRoomModal";
import { joinChatRoom } from "ws/chat";

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
      {showModal && <ChatRoomModal close={closeModalHandler} />}
      <S.EntryBtn onClick={props.status !== "protected" ? joinHandler : showModalHandler}>
        참가
      </S.EntryBtn>
    </>
  );
}
