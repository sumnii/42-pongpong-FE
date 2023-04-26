import { getSocket } from "socket/socket";
import * as S from "./style";
import { useEffect } from "react";

type EvntResultType = {
  status: string;
  roomId: number;
  detail: string;
}

type PropsType = {
  roomId: number;
  username: string;
  close: () => void;
}

export default function InviteBtn(props: PropsType) {
  const socket = getSocket();
  const listener = (res: EvntResultType) => {
    if (res.status === "error") {
      alert(res.detail);
    } else if (res.status === "approved") {
      props.close();
    }
  }
  useEffect(() => {
    socket.on("inviteChatResult", listener);
    return () => {
      socket.off("inviteChatResult", listener);
    }
  }, []);

  const inviteHandler = () => {
    socket.emit("inviteChat", {
      roomId: props.roomId,
      username: props.username,
    });
  };

  return <S.DropMenuItemBox onClick={inviteHandler}>채팅방 초대</S.DropMenuItemBox>;
}
