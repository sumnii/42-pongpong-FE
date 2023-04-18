import * as S from "./style";
import React, { useState } from "react";
import { getSocket } from "socket/socket";
import { NotiType } from "../UserInfo";

type modalProps = {
  close: () => void;
  notiList: NotiType[];
};

function NotificationModal(props: modalProps) {
  const socket = getSocket();
  const joinHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log(e.currentTarget.id);
    socket.emit("joinChatRoom", {
      roomId: Number(e.currentTarget.id),
    })
    props.close();
  }

  return (
    <S.NotificationLayout>
      <h3> 알림 </h3>
      <S.NotiContent>
        {props.notiList.length > 0
          ? props.notiList.map((noti) => {
            return (
              <>
                <S.Span onClick={joinHandler} id={`${noti.chatId}`}>{noti.title}</S.Span><br />
              </>
            )
          })
          : <span>새로운 알림이 없습니다.</span>}
      </S.NotiContent>
      <S.BtnWrapper>
        <S.ModalButton2 onClick={props.close}>확인</S.ModalButton2>
      </S.BtnWrapper>
    </S.NotificationLayout>
  );
}

export default NotificationModal;
