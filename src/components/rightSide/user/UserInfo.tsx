import { useContext, useEffect, useRef, useState } from "react";
import { ProfileImgIsUpContext } from "hooks/context/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import useDropModal from "hooks/useDropModal";
import { getUsername } from "userAuth";
import { getAvatar } from "api/user";
import DmModal from "modal/DmModal";
// import { getSocket } from "socket/socket";
import * as S from "./style";
import { useModal } from "hooks/useModal";

export default function UserInfo(props: {
  listOf?: string;
  username: string;
  userOper?: string;
  subLine: string;
  muted?: boolean;
  banned?: boolean;
  onClickProfile?: () => void;
}) {
  const profileImgIsUp = useContext(ProfileImgIsUpContext);
  const me = getUsername() === props.username;
  const { onDropOpen, onDropClose, dropIsOpen } = useDropModal({
    listOf: props.listOf,
    username: props.username,
  });
  const { Modal, isOpen, onOpen, onClose } = useModal();
  const [img, setImg] = useState("");
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  useEffect(() => {
    const getAvatarHandler = async () => {
      const res = await getAvatar(props.username);
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

  useEffect(() => {
    const node = document.getElementById(props.username + "info");
    node?.addEventListener("mouseenter", () => {
      setIsMouseEnter(true);
    });
    node?.addEventListener("mouseleave", () => {
      setIsMouseEnter(false);
    });

    return () => {
      node?.removeEventListener("mouseenter", () => {
        setIsMouseEnter(true);
      });
      node?.removeEventListener("mouseleave", () => {
        setIsMouseEnter(false);
      });
    };
  }, []);
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
    // socket.emit("dmExit", { username: props.username });
  }

  function onDmOpen() {
    if (props.listOf === "dm") onOpen();
  }

  return (
    <S.UserItem
      key={props.username}
      id={props.username + "info"}
      clickable={props.listOf === "dm"}
      onClick={onDmOpen}
    >
      <S.TmpImg src={img} clickable={props.listOf === "dm"} />
      <S.UserInfoText clickable={props.listOf === "dm"}>
        {props.username}{" "}
        {props.userOper === "owner" ? "👑" : props.userOper === "admin" ? "🎩" : ""}
        {props.muted ? " 🤐" : ""}
        <br />
        {props.subLine}
      </S.UserInfoText>
      {props.listOf === "dm" && isMouseEnter && <S.ExitDmIcon onClick={onDmExit} />}
      {props.listOf !== "dm" && !me && <S.KebabIcon onClick={onDropOpen} />}
      {dropIsOpen && (
        <UserDropMenu
          onClose={onDropClose}
          onDmOpen={onOpen}
          targetUser={props.username}
          targetOper={props.userOper}
          targetMuted={props.muted}
          banned={props.banned}
        />
      )}
      {isOpen && (
        <Modal>
          <DmModal targetUser={props.username} onClose={onClose} />
        </Modal>
      )}
    </S.UserItem>
  );
}
