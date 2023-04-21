import { useContext, useEffect, useState } from "react";
import { ProfileContext, ProfileImgIsUpContext } from "hooks/context/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import useNotiModal from "hooks/useNotiModal";
import * as S from "./style";
import useDropModal from "hooks/useDropModal";
import { getUsername } from "userAuth";
import { getAvatar } from "api/user";

export default function UserInfo(props: {
  listOf?: string;
  username: string;
  userOper?: string;
  subLine: string;
  muted?: boolean;
  banned?: boolean;
}) {
  const setProfileUser = useContext(ProfileContext);
  const profileImgIsUp = useContext(ProfileImgIsUpContext);
  const me = getUsername() === props.username;
  const { onDropOpen, onDropClose, dropIsOpen } = useDropModal({
    listOf: props.listOf,
    username: props.username,
  });
  const [img, setImg] = useState("");
  const { showNotiModal, NotiModal, onOpenNotiModal, newNoti } = useNotiModal();

  // TEST: 구현 중 아바타 api 정지
  // useEffect(() => {
  //   const getAvatarHandler = async () => {
  //     const res = await getAvatar(props.username);
  //     const file = new File([res?.data], "avatar");
  //     const reader = new FileReader();
  //     reader.onload = (ev) => {
  //       const previewImage = String(ev.target?.result);
  //       setImg(previewImage);
  //     };
  //     reader.readAsDataURL(file);
  //   };
  //   getAvatarHandler();
  // }, [profileImgIsUp]);

  return (
    <>
      {showNotiModal && NotiModal}
      <S.TmpImg
        src={img}
        me={props.listOf === undefined}
        onClick={() => {
          !props.listOf && setProfileUser && setProfileUser(props.username);
        }}
      />
      <S.UserInfoText
        me={!props.listOf}
        onClick={() => {
          !props.listOf && setProfileUser && setProfileUser(props.username);
        }}
      >
        {props.username}{" "}
        {props.userOper === "owner" ? "👑" : props.userOper === "admin" ? "🎩" : ""}
        {props.muted ? " 🤐" : ""}
        <br />
        {props.subLine}
      </S.UserInfoText>
      {props.listOf ? (
        !me && <S.KebabIcon onClick={onDropOpen} />
      ) : newNoti ? (
        <S.NewNotiIcon onClick={onOpenNotiModal} />
      ) : (
        <S.EmptyNotiIcon onClick={onOpenNotiModal} />
      )}
      {dropIsOpen && (
        <UserDropMenu
          onClose={onDropClose}
          targetUser={props.username}
          targetOper={props.userOper}
          targetMuted={props.muted}
          banned
        />
      )}
    </>
  );
}
