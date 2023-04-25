import { useNavigate } from "react-router-dom";
import { NotiType } from "hooks/useNotiModal";
import * as S from "./layout/style";

type modalProps = {
  close: () => void;
  notiList: NotiType[];
};

function NotificationModal(props: modalProps) {
  const navigate = useNavigate();
  const joinHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget.id.split("-");
    navigate({
      pathname: `/chat/${target[0]}`,
      search: `title=${target[1]}`,
    });
    props.close();
  };

  return (
    <S.NotificationLayout>
      <h3> 알림 </h3>
      <S.NotiContent>
        {props.notiList.length > 0 ? (
          props.notiList.map((noti) => {
            return (
              <>
                <S.Span
                  key={noti.chatId}
                  onClick={joinHandler}
                  id={`${noti.chatId}-${noti.chatTitle}`}
                >
                  {noti.title}
                </S.Span>
                <br />
              </>
            );
          })
        ) : (
          <span>새로운 알림이 없습니다.</span>
        )}
      </S.NotiContent>
      <S.BtnWrapper>
        <S.ModalButton2 onClick={props.close}>확인</S.ModalButton2>
      </S.BtnWrapper>
    </S.NotificationLayout>
  );
}

export default NotificationModal;
