import { useContext, useEffect, useState } from "react";
import { ProfileImgIsUpContext } from "hooks/context/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import useDropModal from "hooks/useDropModal";
import { getUsername } from "userAuth";
import { getAvatar } from "api/user";
import * as S from "./style";
import DmModal from "modal/DmModal";

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
  const [dmIsOpen, setDmIsOpen] = useState(false);
  const [img, setImg] = useState("");

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

  function onDmOpen() {
    setDmIsOpen(true);
  }

  function onDmClose() {
    setDmIsOpen(false);
  }

  return (
    <>
      {dmIsOpen && <DmModal targetUser={props.username} onClose={onDmClose} />}
      <S.TmpImg src={img} clickable={props.listOf === "dm"} onClick={onDmOpen} />
      <S.UserInfoText clickable={props.listOf === "dm"} onClick={onDmOpen}>
        {props.username}{" "}
        {props.userOper === "owner" ? "👑" : props.userOper === "admin" ? "🎩" : ""}
        {props.muted ? " 🤐" : ""}
        <br />
        {props.subLine}
      </S.UserInfoText>
      {props.listOf !== "dm" && !me && <S.KebabIcon onClick={onDropOpen} />}
      {dropIsOpen && (
        <UserDropMenu
          onClose={onDropClose}
          onDmOpen={onDmOpen}
          targetUser={props.username}
          targetOper={props.userOper}
          targetMuted={props.muted}
          banned={props.banned}
        />
      )}
    </>
  );
}
