import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { useEffect, useState } from "react";
import { JoinEvntType } from "socket/chat";
import Modal from "./modal/Modal";
import PassWdModal from "./modal/PassWdModal";
import { getSocket } from "socket/socket";

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
    if (res.roomId === props.roomId) {
      if (res.status === "approved") {
        navigate(`/chat/${res.roomId}`);
      } else if (res.status === "warning") {
        alert(res.detail);
      } else if (res.status === "error") {
        console.log(res.detail); // 개발자가 알아야 하는 에러 api.txt 참조
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

  function joinHandler() {
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
