import { useEffect, useRef, useState } from "react";
import UserList from "./user/UserList";
import { getSocket } from "socket/socket";
import * as T from "socket/passive/friendDmListType";
import * as S from "./style";

export default function FriendAndDmBar() {
  const socket = getSocket();
  const [isOpen, setIsOpen] = useState<"friend" | "dm" | "">("");
  const [isNewDm, setIsNewDm] = useState(true);
  const [dmList, setDmList] = useState<T.DmListArray>([]);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const id = e.currentTarget.id;
    if (id === "dm") setIsNewDm(false);
    if (id === "friend" || id === "dm") setIsOpen(id);
    if (id === isOpen) setIsOpen("");
  }

  function handleList(res: T.DmList) {
    if (res.type === "dmList") {
      // TEST: DM 리스트 출력
      console.log("dm리스트", res);
      if (isOpen !== "dm") setIsNewDm(true);
      setDmList(res.list);
    }
  }

  useEffect(() => {
    socket.on("message", handleList);
    return () => {
      socket.off("message", handleList);
    };
  }, []);

  useEffect(() => {
    socket.emit("subscribe", {
      type: "dmList",
    });
    return () => {
      socket.emit("unsubscribe", {
        type: "dmList",
      });
    };
  }, []);

  return (
    <>
      <S.BarLayout>
        <S.IconWrapper id="friend" onClick={handleClick}>
          <S.FriendIcon />
        </S.IconWrapper>
        <S.IconWrapper id="dm" onClick={handleClick}>
          {isNewDm ? <S.NewDmIcon /> : <S.DmIcon />}
        </S.IconWrapper>
      </S.BarLayout>
      {isOpen &&
        (isOpen === "dm" ? (
          <UserList listOf={isOpen} list={dmList} />
        ) : (
          <UserList listOf={isOpen} />
        ))}
    </>
  );
}
