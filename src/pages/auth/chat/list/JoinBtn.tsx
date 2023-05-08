import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoomResponse } from "socket/active/chatEventType";
import { getSocket } from "socket/socket";
import Modal from "modal/layout/Modal";
import PassWdModal from "modal/PassWdModal";
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
    if (res.roomId !== props.roomId) return;
    if (res.status === "error") {
      console.log(res);
    } else if (res.status === "warning") {
      if (showModal) {
        if (res.detail === "밴 당하셨습니다.") setNotice("입장이 거부된 방입니다.");
        else setNotice(res.detail);
      } else {
        if (res.detail === "밴 당하셨습니다.") alert("입장이 거부된 방입니다.");
        else alert(res.detail);
      }
    } else {
      navigate({
        pathname: `/chat/${res.roomId}`,
        search: `title=${props.title}`,
      });
    }
  };

  useEffect(() => {
    socket.on("joinChatRoomResult", listner);
    return () => {
      socket.off("joinChatRoomResult", listner);
    };
  }, [showModal]);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    if (notice) setNotice("");
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
        <S.EntryBtn onClick={joinMyChatHandler}>재입장</S.EntryBtn>
      ) : (
        <S.EntryBtn onClick={props.status !== "protected" ? joinHandler : showModalHandler}>
          참여
        </S.EntryBtn>
      )}
    </>
  );
}
