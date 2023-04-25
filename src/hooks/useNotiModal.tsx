import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSocket } from "socket/socket";
import Modal from "modal/layout/Modal";
import NotificationModal from "modal/NotificationModal";

export type NotiType = {
  title: string;
  chatId?: number;
  chatTitle?: string;
  dmId?: number;
  gameId?: number;
};

type InvitationType = {
  type: string;
  roomId: number;
  from: string;
};

export default function useNotiModal() {
  const target = useLocation().pathname.split("/");
  const socket = getSocket();
  const [noti, setNoti] = useState<NotiType[]>([]);
  const [newNoti, setNewNoti] = useState(false);
  const [showNotiModal, setShowNotiModal] = useState(false);
  const locPage = target[1];
  const locRoom = target[2];

  const listener = (res: InvitationType) => {
    if (res.type === "chatInvitation") {
      console.log(res);
      setNewNoti(true);
    }
  };

  useEffect(() => {
    socket.on("message", listener);
    return () => {
      socket.off("message", listener);
    };
  }, []);

  useEffect(() => {
    socket.emit("subscribe", {
      type: "chatInvitation",
    });
    socket.emit("subscribe", {
      type: "gameInvitation",
    });
    return () => {
      socket.emit("unsubscribe", {
        type: "chatInvitation",
      });
      socket.emit("unsubscribe", {
        type: "gameInvitation",
      });
    };
  }, []);

  const closeModalHandler = () => {
    setShowNotiModal(false);
    setNewNoti(false);
    setNoti([]);
  };

  const onOpenNotiModal = () => {
    setShowNotiModal(true);
  };

  return {
    showNotiModal,
    NotiModal: (
      <Modal set={"noti"} setView={closeModalHandler}>
        <NotificationModal close={closeModalHandler} notiList={noti} />
      </Modal>
    ),
    onOpenNotiModal,
    newNoti,
  };
}
