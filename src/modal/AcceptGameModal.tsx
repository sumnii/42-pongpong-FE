import { useEffect, useState } from "react";
import * as S from "./layout/style";
import { useNavigate } from "react-router-dom";
import { getSocket } from "socket/socket";

type modalProps = {
  close: () => void;
  parentClose: () => void;
  targetUser: string;
};

type ResponseType = {
  status: string;
  roomId: number;
  detail: string;
}

export default function AcceptGameModal(props: modalProps) {
  const [notice, setNotice] = useState("");
  const socket = getSocket();
  const navigate = useNavigate();

  const acceptListener = (res: ResponseType) => {
    if (res.status === "approved") {
      navigate(`/game/${res.roomId}`);
      props.close();
      props.parentClose();
    } else if (res.status === "warning") {
      setNotice(res.detail);
    } else {
      console.log(res);
    }
  };

  const declineListener = (res: ResponseType) => {
    if (res.status === "approved") {
      props.close();
    } else if (res.status === "warning") {
      setNotice(res.detail);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    socket.on("acceptGameResult", acceptListener);
    socket.on("declineGameResult", declineListener);
    return () => {
      socket.off("acceptGameResult", acceptListener);
      socket.off("declineGameResult", declineListener);
    };
  }, []);

  const acceptHandler = () => {
    if (notice) {
      props.close();
    } else {
      socket.emit("acceptGame", {
        username: props.targetUser,
      });
    }
  };

  const declineHandler = () => {
    if (notice) {
      props.close();
    } else {
      socket.emit("declineGame", {
        username: props.targetUser,
      });
    }
  };

  return (
    <S.AcceptGameLayout>
      <h2>{props.targetUser}님의 게임 수락하시겠습니까?</h2>
      <S.SpanAbsolute color="red">{notice}</S.SpanAbsolute>
      <S.Wrapper>
        <S.ModalButton onClick={acceptHandler}>확인</S.ModalButton>
        <S.ModalButton onClick={declineHandler}>취소</S.ModalButton>
      </S.Wrapper>
    </S.AcceptGameLayout>
  );
}
