import { getSocket } from "socket/socket";
import * as S from "../style";
import { useQueryClient } from "@tanstack/react-query";
import { ChatRoomResponse } from "socket/active/chatEventType";
import { useEffect } from "react";

export default function RemoveFrendBtn(props: { username: string }) {
  const socket = getSocket();
  const queryCli = useQueryClient();

  const listener = (res: ChatRoomResponse) => {
    if (res.status === "approved") {
      alert("친구 취소 했습니다.");
      queryCli.resetQueries(["profile", props.username]);
    } else if (res.status === "warning") {
      alert(res.detail);
    } else {
      console.log("removeFriendResult", res);
    }
  };

  useEffect(() => {
    socket.on("removeFriendResult", listener);
    return () => {
      socket.off("removeFriendResult", listener);
    };
  }, []);

  const removeBtnHandler = () => {
    socket.emit("removeFriend", {
      username: props.username,
    });
  };

  return (
    <S.Button warning onClick={removeBtnHandler}>
      친구 취소
    </S.Button>
  );
}
