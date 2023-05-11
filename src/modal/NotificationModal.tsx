import { useNavigate } from "react-router-dom";
import { NotiType } from "hooks/useNotiModal";
import * as S from "./layout/style";
import useGameModal from "hooks/useGameModal";
import AcceptGameModal from "./AcceptGameModal";
import { useState } from "react";

type modalProps = {
  close: () => void;
  notiList: NotiType[];
};

function NotificationModal(props: modalProps) {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const G = useGameModal();

  const chatJoinHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget.id.split("-");
    navigate({
      pathname: `/chat/${target[0]}`,
      search: `title=${target[1]}`,
    });
    props.close();
  };

  const gameJoinHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    setFrom(e.currentTarget.id);
    G.onOpen();
  };

  return (
    <S.NotificationLayout>
      <h3> 알림 </h3>
      <S.NotiContent>
        {props.notiList.length > 0 ? (
          props.notiList.map((noti) => {
            return (
              <>
                {noti.type === "chat" ? (
                  <div key={noti.chatId}>
                    <S.Span onClick={chatJoinHandler} id={`${noti.chatId}-${noti.chatTitle}`}>
                      {noti.title}
                    </S.Span>
                    <br />
                  </div>
                ) : (
                  <div key={`${Date.now()}_${noti.from}`}>
                    <S.Span onClick={gameJoinHandler} id={`${noti.from}`}>
                      {noti.title}
                    </S.Span>
                  </div>
                )}
              </>
            );
          })
        ) : (
          <span>새로운 알림이 없습니다.</span>
        )}
      </S.NotiContent>
      <S.BtnWrapper>
        <S.ModalButton onClick={props.close}>확인</S.ModalButton>
      </S.BtnWrapper>
      {
        G.isOpen && (
          <G.GameModal back="noBack">
            <AcceptGameModal close={G.onClose} targetUser={from} parentClose={props.close} />
          </G.GameModal>
        )
      }
    </S.NotificationLayout>
  );
}

export default NotificationModal;
