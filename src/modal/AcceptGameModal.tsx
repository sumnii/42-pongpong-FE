import { useEffect, useState } from "react";
import * as S from "./layout/style";
import { useNavigate } from "react-router-dom";
import { getSocket } from "socket/socket";

type modalProps = {
  close: () => void;
  parentClose: () => void;
  targetUser: string;
};

export default function AcceptGameModal(props: modalProps) {
  const [notice, setNotice] = useState("");
  const socket = getSocket();
  const navigate = useNavigate();

  const acceptListener = (res: any) => {
    console.log("accept", res);
    if (res.status === "approved") {
      //navigate() // 서버 gameroomId 미구현
      props.close();
      props.parentClose();
    }
  };

  const declineListener = (res: any) => {
    console.log("decline", res);
    if (res.status === "approved") {
      props.close();
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
    socket.emit("acceptGame", {
      username: props.targetUser,
    });
    //props.close();
    //props.parentClose();
  };

  const declineHandler = () => {
    //props.close();
    socket.emit("declineGame", {
      username: props.targetUser,
    });
  };

  return (
    <S.AcceptGameLayout>
      <h2>{props.targetUser}님의 게임 수락하시겠습니까?</h2>
      <S.Wrapper>
        <S.ModalButton2 onClick={acceptHandler}>확인</S.ModalButton2>
        <S.ModalButton2 onClick={declineHandler}>취소</S.ModalButton2>
      </S.Wrapper>
    </S.AcceptGameLayout>
  );
}
