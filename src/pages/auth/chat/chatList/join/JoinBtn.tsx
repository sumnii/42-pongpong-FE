import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { useEffect, useRef, useState } from "react";
import { JoinEvntType, joinChatRoom } from "socket/chat";
import Modal from "./modal/Modal";
import PassWdModal from "./modal/PassWdModal";
import { disconnectSocket, getSocket } from "socket/socket";

type PropsType = {
  no: string | number;
  status?: string;
  roomId: number | undefined;
};

export default function JoinChatRoom(props: PropsType) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const socket = getSocket();

  const listner = (res: JoinEvntType) => {
    console.log(res);
    if (res.roomId === props.roomId) {
      if (res.status === "approved") {
        navigate(`/chat/${res.roomId}`);
      } else if (res.status === "warning") {
        alert(res.detail);
      } else if (res.status === "error") {
        console.log(res.detail);
      }
    }
  };

  useEffect(() => {
    socket.on("joinChatRoomResult", listner);
    return () => {
      socket.off("joinChatRoomResult", listner);
    };
  });

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  function joinHandler(e: React.MouseEvent<HTMLButtonElement>) {
    socket.emit("joinChatRoom", {
      roomId: props.roomId,
    });
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
