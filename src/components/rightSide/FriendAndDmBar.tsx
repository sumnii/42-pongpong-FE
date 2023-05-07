import { useEffect, useState } from "react";
import UserList from "./user/UserList";
import { getSocket } from "socket/socket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDmList } from "api/dm";
import LoadingCircle from "components/LoadingCircle";
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
      setIsNewDm(false);
      queryClient.invalidateQueries(["list", "dm"]);
    }
    id === isOpen ? setIsOpen("") : setIsOpen(id as "friend" | "dm" | "");
  }

  function handleList(res: T.DmList) {
    if (res.type !== "dmList") return;
    const dmNode = document.getElementById("modal-root")?.firstChild;
    if (!dmNode) {
      isOpen === "dm" ? queryClient.invalidateQueries(["list", "dm"]) : setIsNewDm(true);
    }
  }

  useEffect(() => {
    socket.on("message", handleList);
    return () => {
      socket.off("message", handleList);
    };
  }, [isOpen]);

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
              <LoadingCircle w={50} h={50} />
            </S.UserListLayout>
          ) : (
            <UserList key={"dm"} listOf={isOpen} list={dmListQuery.data?.list} />
          )
        ) : (
          <UserList key={"friend"} listOf={isOpen} list={null} />
        ))}
    </>
  );
}
