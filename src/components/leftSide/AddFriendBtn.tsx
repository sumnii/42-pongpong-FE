import { useEffect } from "react";
import * as S from "./style";
import { getSocket } from "socket/socket";
import { ChatRoomResponse } from "socket/active/chatEventType";
import { useQueryClient } from "@tanstack/react-query";

export default function AddFriendBtn(props: { username: string }) {
  const socket = getSocket();
  const queryCli = useQueryClient();

  const listener = (res: ChatRoomResponse) => {
    if (res.status === "approved") {
      alert("친구가 되었습니다");
      queryCli.refetchQueries(["profile", props.username]);
    } else if (res.status === "warning") {
      alert(res.detail);
    } else {
      console.log("addFriendResult", res);
    }
  };

  useEffect(() => {
    socket.on("addFriendResult", listener);
    return () => {
      socket.off("addFriendResult", listener);
    };
  }, []);

  const addBtnHandler = () => {
    socket.emit("addFriend", {
      username: props.username,
    });
  };
  
  return <S.Button onClick={addBtnHandler}>친구 추가</S.Button>;
}
