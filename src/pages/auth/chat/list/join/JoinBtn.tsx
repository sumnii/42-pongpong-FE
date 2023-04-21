import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoomResponse } from "socket/active/chatEventType";
import { getSocket } from "socket/socket";
import Modal from "./modal/Modal";
import PassWdModal from "./modal/PassWdModal";
import * as S from "./style";

type PropsType = {
  no: string | number;
  status?: string;
  roomId: number | undefined;
  title: string;
  myRoom?: boolean;
};

export default function JoinChatRoom(props: PropsType) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const socket = getSocket();
  const [notice, setNotice] = useState("");

  const listner = (res: ChatRoomResponse) => {
    if (res.status === "error") {
      // status (error, warning) 에도 roomId가 있다면
      console.log(res);
    } else if (res.status === "warning") {
      setNotice(res.detail);
    } else {
      if (res.roomId === props.roomId) {
        navigate({
          pathname: `/chat/${res.roomId}`,
          search: `title=${props.title}`,
        });
      }
    }
  };

  useEffect(() => {
    socket.on("joinChatRoomResult", listner);
    return () => {
      socket.off("joinChatRoomResult", listner);
    };
  }, []);

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

  function joinMyChatHandler() {
    navigate({
      pathname: `/chat/${props.roomId}`,
      search: `title=${props.title}`,
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
      {props.myRoom ? (
        <S.EntryBtn onClick={joinMyChatHandler}>참가</S.EntryBtn>
      ) : (
        <S.EntryBtn onClick={props.status !== "protected" ? joinHandler : showModalHandler}>
          참가
        </S.EntryBtn>
      )}
    </>
  );
}
