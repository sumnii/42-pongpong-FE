import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "hooks/ProfileContext";
import * as S from "./style";
import { getSocket } from "socket/socket";
import { ChatEvntType, ChatListType } from "socket/chat";
import { useLocation } from "react-router-dom";
import NotificationModal from "./modal/NotificationModal";
import Modal from "./modal/Modal";

export type NotiType = {
  title: string;
  chatId?: number;
  dmId?: number;
  gameId?: number;
}

export default function UserInfo(props: {
  username: string;
  icon?: string;
  subLine: string;
  handleDrop?: () => void;
}) {
  const setProfileUser = useContext(ProfileContext);
  const target = useLocation().pathname.split("/");
  const socket = getSocket();
  const [myChat, setMyChat] = useState<ChatListType[]>([]);
  const [noti, setNoti] = useState<NotiType[]>([]);
  const [newNoti, setNewNoti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const locPage = target[1];
  const locRoom = target[2];

  const listener = (res: ChatEvntType) => {
    if (locPage !== "chat" || locRoom !== String(res.roomId)) {
      myChat.map((chat) => {
        if (chat.roomId === res.roomId) {
          console.log(res.roomId);
          const data: NotiType = {
            title: "참여하고 있는 채팅방에 새로운 메시지",
            chatId: res.roomId,
          }
          setNoti([data, ...noti]);
          setNewNoti(true);
        }
      });
    }
  }

  const myChatListener = (res: ChatListType[]) => {
    setMyChat(res);
  }

  useEffect(() => {
    socket.on("chat", listener);
    socket.on("updateMyChatRoomList", myChatListener)
    return () => {
      socket.off("chat", listener);
      socket.off("updateMyChatRoomList", myChatListener);
    }
  });

  const closeModalHandler = () => {
    setShowModal(false);
    setNewNoti(false);
    setNoti([]);
  }

  const openModalHandler = () => {
    setShowModal(true);
  }

  return (
    <>
      {
        showModal && (
          <Modal setView={closeModalHandler}>
            <NotificationModal close={closeModalHandler} notiList={noti}/>
          </Modal>
        )
      }
      <S.TmpImg
        onClick={() => {
          setProfileUser && setProfileUser(props.username);
        }}
      />
      <S.UserInfoText
        onClick={() => {
          setProfileUser && setProfileUser(props.username);
        }}
      >
        {props.username} {props.icon}
        <br />
        {props.subLine}
      </S.UserInfoText>
      {props.handleDrop && <S.KebabIcon onClick={props.handleDrop} />}
      {/* TODO: props.handleDrop 대신 알림 모달창 띄우는 handler를 prop으로 받아 조건 변경 필요 */}
      {props.handleDrop || (
        newNoti ? <S.NewInviteIcon onClick={openModalHandler} /> : <S.EmptyInviteIcon onClick={openModalHandler}/>
      )}
    </>
  );
}
