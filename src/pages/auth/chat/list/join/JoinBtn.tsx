import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { useEffect, useRef, useState } from "react";
import { JoinEvntType } from "socket/chat";
import Modal from "./modal/Modal";
import PassWdModal from "./modal/PassWdModal";
import { getSocket } from "socket/socket";

type PropsType = {
  no: string | number;
  status?: string;
  roomId: number | undefined;
  title: string;
};

export default function JoinChatRoom(props: PropsType) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const socket = getSocket();
  const [notice, setNotice] = useState("");
  const joinBtnRef = useRef<HTMLButtonElement>(null);

  const listner = (res: JoinEvntType) => {
    if (res.roomId === Number(joinBtnRef.current?.id)) {
      if (res.status === "approved") {
        navigate({
          pathname: `/chat/${res.roomId}`,
          search: `title=${props.title}`
        });
      } else if (res.status === "warning") {
        setNotice(res.detail);
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
            room={props.roomId}
            noti={notice}
            setNoti={setNotice}
          />
        </Modal>
      )}
      <S.EntryBtn id={`${props.roomId}`} ref={joinBtnRef} onClick={props.status !== "protected" ? joinHandler : showModalHandler}>
        참가
      </S.EntryBtn>
    </>
  );
}
