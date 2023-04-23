import { useContext, useEffect, useState } from "react";
import { ProfileImgIsUpContext } from "hooks/context/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import useDropModal from "hooks/useDropModal";
import { getUsername } from "userAuth";
import { getAvatar } from "api/user";
import * as S from "./style";

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

  return (
    <>
      <S.TmpImg
        src={img}
        clickable={props.listOf === undefined}
        onClick={() => {
          // TODO
        }}
      />
      <S.UserInfoText
        clickable={!props.listOf}
        onClick={() => {
          // TODO
        }}
      >
        {props.username}{" "}
        {props.userOper === "owner" ? "👑" : props.userOper === "admin" ? "🎩" : ""}
        {props.muted ? " 🤐" : ""}
        <br />
        {props.subLine}
      </S.UserInfoText>
      {props.listOf && !me && <S.KebabIcon onClick={onDropOpen} />}
      {dropIsOpen && (
        <UserDropMenu
          onClose={onDropClose}
          targetUser={props.username}
          targetOper={props.userOper}
          targetMuted={props.muted}
          banned={props.banned}
        />
      )}
    </>
  );
}
