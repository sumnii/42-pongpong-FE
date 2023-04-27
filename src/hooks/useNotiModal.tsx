import { useEffect, useState } from "react";
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

export default function useNotiModal(status: string) {
  const socket = getSocket();
  const [noti, setNoti] = useState<NotiType[]>([]);
  const [newNoti, setNewNoti] = useState(false);
  const [showNotiModal, setShowNotiModal] = useState(false);

  const listener = (res: InvitationType) => {
    if (res.type === "chatInvitation") {
      setNoti((prev) => [
        ...prev,
        {
          title: `${res.from} 님으로 부터 #${res.roomId} 채팅방에 초대 되었습니다.`,
          chatId: res.roomId,
          chatTitle: "초대된 ",
        },
      ]);
      setNewNoti(true);
      if (status === "login") setShowNotiModal(true); // 게임 중 일때는 팝업 x
    }
  };

  useEffect(() => {
    socket.on("message", listener);
    return () => {
      socket.off("message", listener);
    };
  });

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
      <Modal set={"noti"} setView={onOpenNotiModal}>
        <NotificationModal close={closeModalHandler} notiList={noti} />
      </Modal>
    ),
    onOpenNotiModal,
    newNoti,
  };
}
