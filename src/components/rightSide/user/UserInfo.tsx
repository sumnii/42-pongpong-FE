import { useContext, useState } from "react";
import { ProfileContext } from "hooks/context/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import useNotiModal from "hooks/useNotiModal";
import useDropModal from "hooks/useDropModal";
import { getUsername } from "userAuth";
import { getAvatar } from "api/user";
import { useQuery } from "@tanstack/react-query";
import * as S from "./style";

export default function UserInfo(props: {
  listOf?: string;
  username: string;
  userOper?: string;
  subLine: string;
  muted?: boolean;
  banned?: boolean;
}) {
  const setProfileUser = useContext(ProfileContext);
  const me = getUsername() === props.username;
  const { onDropOpen, onDropClose, dropIsOpen } = useDropModal({
    listOf: props.listOf,
    username: props.username,
  });
  const { showNotiModal, NotiModal, onOpenNotiModal, newNoti } = useNotiModal();

  const avatarQuery = useQuery({
    queryKey: ["avatar", `${props.username}`],
    queryFn: () => {
      if (props.username) return getAvatar(props.username);
    },
    enabled: !!props.username,
  });
  if (avatarQuery.isLoading) console.log("loading");

  return (
    <>
      {showNotiModal && NotiModal}
      <S.ProfileImg
        src={String(avatarQuery.data)}
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
          banned={props.banned}
          subLine={props.subLine}
        />
      )}
    </>
  );
}
