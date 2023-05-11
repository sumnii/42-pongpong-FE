import { useContext, useEffect, useState } from "react";
import { getSocket } from "socket/socket";
import Modal from "modal/layout/Modal";
import NotificationModal from "modal/NotificationModal";
import { NoticeListContext } from "./context/NoticeListContext";

export type NotiType = {
  key: number;
  type: string;
  title: string;
  chatId?: number;
  chatTitle?: string;
  dmId?: number;
  gameId?: number;
  from?: string;
};

type InvitationType = {
  type: string;
  roomId: number;
  from: string;
};

export default function useNotiModal(status: string) {
  const socket = getSocket();
  const notice = useContext(NoticeListContext);
  const [newNoti, setNewNoti] = useState(false);
  const [showNotiModal, setShowNotiModal] = useState(false);
  const [idx, setIdx] = useState(0);

  const listener = (res: InvitationType) => {
    if (res.type === "chatInvitation") {
      notice?.setNotiList((prev) => [
        ...prev,
        {
          key: idx,
          type: "chat",
          title: `${res.from} 님으로 부터 #${res.roomId} 채팅방에 초대 되었습니다.`,
          chatId: res.roomId,
          chatTitle: "초대된 채팅방",
        },
      ]);
      
      setNewNoti(true);
      if (status === "login") setShowNotiModal(true); // 게임 중 일때는 팝업 x
    } else if (res.type === "gameInvitation") {
      notice?.setNotiList((prev) => [
        ...prev,
        {
          key: idx,
          type: "game",
          title: `${res.from} 님으로 부터 게임 신청이 왔습니다.`,
          from: res.from,
        },
      ]);
      setNewNoti(true);
      if (status === "login") setShowNotiModal(true);
    }
    setIdx(idx + 1);
  };

  const onRemove = (key: number) => {
    notice?.setNotiList(notice.notiList.filter((elem) => elem.key !== key));
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
  };

  const onOpenNotiModal = () => {
    setShowNotiModal(true);
  };

  return {
    showNotiModal,
    NotiModal: (
      <Modal set={"noti"} setView={onOpenNotiModal}>
        <NotificationModal close={closeModalHandler} notiList={notice?.notiList} onRemove={onRemove} />
      </Modal>
    ),
    onOpenNotiModal,
    newNoti,
  };
}
