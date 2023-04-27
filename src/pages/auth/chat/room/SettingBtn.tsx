import { useEffect, useState } from "react";
import * as S from "./style";
import Modal from "modal/layout/Modal";
import SettingPwModal from "modal/SettingPwModal";
import { getSocket } from "socket/socket";
import { useParams } from "react-router-dom";
import { ChatRoomResponse } from "socket/active/chatEventType";

export default function SettingBtn() {
  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState("");
  const socket = getSocket();
  const { roomId } = useParams();

  const listener = (res: ChatRoomResponse) => {
    console.log(res);
    if (res.roomId !== Number(roomId)) return;
    if (res.status === "approved") {
      alert("설정이 완료되었습니다.");
      setShowModal(false);
    } else {
      setNotice(res.detail);
    }
  };

  useEffect(() => {
    socket.on("removePasswordResult", listener);
    socket.on("changePasswordResult", listener);
    socket.on("setPasswordResult", listener);
    return () => {
      socket.off("removePasswordResult", listener);
      socket.off("changePasswordResult", listener);
      socket.off("setPasswordResult", listener);
    };
  }, []);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal setView={closeModalHandler}>
          <SettingPwModal close={closeModalHandler} notice={notice} setNotice={setNotice} />
        </Modal>
      )}
      <S.SettingBtnIcon size={30} onClick={openModalHandler} />
    </>
  );
}
