import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAvatar } from "api/user";
import useDropModal from "hooks/useDropModal";
import useModal from "hooks/useModal";
import useMouseOver from "hooks/useMouseOver";
import DmModal from "modal/DmModal";
import UserDropMenu from "./UserDropMenu";
import { getUsername } from "userAuth";
import { getSocket } from "socket/socket";
import { ExitDmResultType } from "socket/active/dmEventType";
import * as S from "./style";
import { TargetStatusType } from "@rightSide/rightSideType";

type UserInfoProps = {
  listOf: string;
  username: string;
  subLine: string;
  userStatus?: TargetStatusType;
};

export default function UserInfo({ listOf, username, subLine, userStatus }: UserInfoProps) {
  const me = getUsername() === username;
  const { onDropOpen, onDropClose, dropIsOpen } = useDropModal({
    listOf: listOf,
    username: username,
  });
  const { Modal, isOpen, onOpen, onClose } = useModal();
  const { isMouseEnter, onLeave } = useMouseOver({ listOf, user: username });
  const queryClient = useQueryClient();

  const avatarQuery = useQuery({
    queryKey: ["avatar", `${username}`],
    queryFn: () => {
      if (username) return getAvatar(username);
    },
  });

  const socket = getSocket();

  function exitDmHandler(res: ExitDmResultType) {
    if (res.username !== username) return;
    if (res.status === "approved") queryClient.refetchQueries(["list", "dm"]);
    else console.error(res);
    // TEST: DM 나가기 실패하는 경우 핸들링
  }

  useEffect(() => {
    socket.on("exitDmResult", exitDmHandler);
    return () => {
      socket.off("exitDmResult", exitDmHandler);
    };
  }, []);

  function onDmExit(e: React.MouseEvent<SVGElement>) {
    e.stopPropagation();
    socket.emit("exitDm", { username: username });
  }

  function onDmOpen() {
    if (listOf === "dm") {
      onLeave && onLeave();
      onOpen();
    }
  }

  return (
    <S.UserItem
      key={username}
      id={username + "info"}
      clickable={listOf === "dm"}
      onClick={onDmOpen}
    >
      {avatarQuery.isLoading ? (
        <S.LoadingImg />
      ) : (
        <S.ProfileImg src={String(avatarQuery.data)} clickable={listOf === "dm"} />
      )}
      <S.UserInfoText clickable={listOf === "dm"}>
        {username} {userStatus?.oper === "owner" ? "👑" : userStatus?.oper === "admin" ? "🎩" : ""}
        {userStatus?.muted ? " 🤐" : ""} {userStatus?.blocked ? " 🚫" : ""}
        <br />
        {listOf === "dm" ? "✉️ " : ""}
        {subLine}
      </S.UserInfoText>
      {isMouseEnter && <S.ExitDmIcon onClick={onDmExit} />}
      {listOf !== "dm" && !me && <S.KebabIcon onClick={onDropOpen} />}
      {dropIsOpen && (
        <UserDropMenu
          onClose={onDropClose}
          onDmOpen={onOpen}
          targetUser={username}
          menuFor={listOf}
          targetStatus={userStatus}
        />
      )}
      {isOpen && (
        <Modal key={username}>
          <DmModal targetUser={username} onClose={onClose} />
        </Modal>
      )}
    </S.UserItem>
  );
}
