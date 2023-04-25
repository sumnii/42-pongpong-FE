import { useContext, useEffect, useState } from "react";
import { ProfileImgIsUpContext } from "hooks/context/ProfileContext";
import { getAvatar } from "api/user";
import useDropModal from "hooks/useDropModal";
import useModal from "hooks/useModal";
import useMouseOver from "hooks/useMouseOver";
import DmModal from "modal/DmModal";
import UserDropMenu from "./UserDropMenu";
import { getUsername } from "userAuth";
// import { getSocket } from "socket/socket";
import * as S from "./style";

type UserInfoProps = {
  listOf?: string;
  username: string;
  userOper?: string;
  subLine: string;
  muted?: boolean;
  banned?: boolean;
  onClickProfile?: () => void;
};

export default function UserInfo({
  listOf,
  username,
  userOper,
  subLine,
  muted,
  banned,
  onClickProfile,
}: UserInfoProps) {
  const profileImgIsUp = useContext(ProfileImgIsUpContext);
  const me = getUsername() === username;
  const { onDropOpen, onDropClose, dropIsOpen } = useDropModal({
    listOf: listOf,
    username: username,
  });
  const { Modal, isOpen, onOpen, onClose } = useModal();
  const [img, setImg] = useState("");
  const node = document.getElementById(username + "info");
  const { isMouseEnter, onLeave } = useMouseOver({ listOf, node });

  useEffect(() => {
    const getAvatarHandler = async () => {
      const res = await getAvatar(username);
      const file = new File([res?.data], "avatar");
      const reader = new FileReader();
      reader.onload = (ev) => {
        const previewImage = String(ev.target?.result);
        setImg(previewImage);
      };
      reader.readAsDataURL(file);
    };
    getAvatarHandler();
  }, [profileImgIsUp]);

  // const socket = getSocket();

  // TODO: dm exit 완성 필요
  // useEffect(() => {
  //   socket.on("dmExitResult", (res) => {
  //     console.log(res);
  //   });
  //   return () => {
  //     socket.off("dmExitResult", (res) => {
  //       console.log(res);
  //     });
  //   };
  // });

  function onDmExit(e: React.MouseEvent<SVGElement>) {
    e.stopPropagation();
    alert("dm 나가기!");
    // TODO: dm exit 서버 구현되면 완성하기!
    // socket.emit("dmExit", { username: username });
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
      <S.TmpImg src={img} clickable={listOf === "dm"} />
      <S.UserInfoText clickable={listOf === "dm"}>
        {username} {userOper === "owner" ? "👑" : userOper === "admin" ? "🎩" : ""}
        {muted ? " 🤐" : ""}
        <br />
        {subLine}
      </S.UserInfoText>
      {isMouseEnter && <S.ExitDmIcon onClick={onDmExit} />}
      {listOf !== "dm" && !me && <S.KebabIcon onClick={onDropOpen} />}
      {dropIsOpen && (
        <UserDropMenu
          onClose={onDropClose}
          onDmOpen={onOpen}
          targetUser={username}
          targetOper={userOper}
          targetMuted={muted}
          banned={banned}
        />
      )}
      {isOpen && (
        <Modal>
          <DmModal targetUser={username} onClose={onClose} />
        </Modal>
      )}
    </S.UserItem>
  );
}
