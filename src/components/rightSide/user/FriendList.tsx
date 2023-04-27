import UserInfo from "./UserInfo";
import * as S from "../style";
import { useEffect, useState } from "react";
import { getSocket } from "socket/socket";

type FriendType = {
  type: string;
  list: FriendListType;
};

type FriendListType = {
  username: string;
  status: string;
}[];

export default function FriendList(props: { listOf: string }) {
  const socket = getSocket();
  const [friendList, setFriendList] = useState<FriendListType>([]);

  const listener = (res: FriendType) => {
    if (res.type === "friend") {
      setFriendList(res.list);
    }
  };

  useEffect(() => {
    socket.emit("subscribe", {
      type: "friendList",
    });
    socket.on("message", listener);
    return () => {
      socket.emit("unsubscribe", {
        type: "friendList",
      });
      socket.off("message", listener);
    };
  }, []);

  return (
    <>
      {friendList.map((user) => {
        return (
          <UserInfo
            key={user.username}
            listOf={props.listOf}
            username={user.username}
            subLine={user.status === "login" ? "🟣 온라인" : "⚫️ 오프라인"}
          />
        );
      })}
    </>
  );
}
