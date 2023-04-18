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

  const listner = (res: JoinEvntType) => {
    // console.log(res);
    if (res.type === "chatRoom" && res.roomId === props.roomId) {
      if (res.status === "approved") {
        navigate({
          pathname: `/chat/${res.roomId}`,
          search: `title=${props.title}`
        });
        // socket.emit("subscribe", {
        //   type: "chatRoom",
        //   roomId: res.roomId,
        // })
      } else if (res.status === "warning") {
        setNotice(res.detail);
      } else if (res.status === "error") {
        console.log(res.detail); // 개발자가 알아야 하는 에러 api.txt 참조
      }
    }
  };

  const listnerMsg = (res: JoinEvntType) => {
    if (res.type === "chatRoom" && res.roomId === props.roomId) {
      console.log("joinBtn", res);
      if (res.status === "approved") {
        navigate({
          pathname: `/chat/${res.roomId}`,
          search: `?${props.title}`
        });
        // socket.emit("subscribe", {
        //   type: "chatRoom",
        //   roomId: res.roomId,
        // })
      } else if (res.status === "warning") {
        setNotice(res.detail);
      } else if (res.status === "error") {
        console.log(res.detail); // 개발자가 알아야 하는 에러 api.txt 참조
      }
    }
  };

  useEffect(() => {
    socket.on("joinChatRoomResult", listner);
    socket.on("message", listnerMsg);
    return () => {
      socket.off("joinChatRoomResult", listner);
      socket.off("message", listnerMsg);
    };
  });

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  function joinHandler() {
    // socket.emit("joinChatRoom", {
    //   roomId: props.roomId,
    // });
    socket.emit("subscribe", {
      type: "chatRoom",
      roomId: props.roomId
    })
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
      <S.EntryBtn onClick={props.status !== "protected" ? joinHandler : showModalHandler}>
        참가
      </S.EntryBtn>
    </>
  );
}
