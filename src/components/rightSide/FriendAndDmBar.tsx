import { useEffect, useState } from "react";
import UserList from "./user/UserList";
import { getSocket } from "socket/socket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDmList } from "api/dm";
import * as T from "socket/passive/friendDmListType";
import * as S from "./style";

export default function FriendAndDmBar() {
  const socket = getSocket();
  const [isOpen, setIsOpen] = useState<"friend" | "dm" | "">("");
  const [isNewDm, setIsNewDm] = useState(false);
  const queryClient = useQueryClient();

  const dmListQuery = useQuery({
    queryKey: ["list", "dm"],
    queryFn: () => {
      return getDmList();
    },
    enabled: isOpen === "dm",
  });

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const id = e.currentTarget.id;
    if (id === "dm") {
      queryClient.invalidateQueries(["list", "dm"]);
      setIsNewDm(false);
    }
    setIsOpen(id as "friend" | "dm" | "");
    if (id === isOpen) setIsOpen("");
  }

  function handleList(res: T.DmList) {
    if (res.type === "dmList") {
      console.log("dm 리스트", res, "현재 열림:", isOpen);
      if (isOpen !== "dm") setIsNewDm(true);
      // TODO: dm 모달 안띄워져 있을때 하기!
      // queryClient.invalidateQueries(["list", "dm"]);
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
          dmListQuery.isLoading ? (
            <S.UserListLayout>
              <h3>dm</h3>
            </S.UserListLayout>
          ) : (
            <UserList key={"dm"} listOf={isOpen} list={dmListQuery.data.list} />
          )
        ) : (
          <UserList key={"friend"} listOf={isOpen} />
        ))}
    </>
  );
}
