import { useEffect, useRef, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "hooks/context/ProfileContext";
import { useOper, onProfile } from "hooks/useOper";
import { UserListContext } from "hooks/context/UserListContext";
import InviteBtn from "./InviteBtn";
import * as S from "./style";

export default function UserDropMenu(props: {
  onClose: () => void;
  onDmOpen: () => void;
  targetUser: string;
  targetOper?: string;
  targetMuted?: boolean;
  banned?: boolean;
  subLine?: string;
}) {
  const setProfileUser = useContext(ProfileContext);
  const roomId = Number(useParams().roomId);
  const dropRef: React.RefObject<HTMLDivElement> = useRef(null);
  const myOper = useContext(UserListContext)?.myOper;
  const onAppointAdmin = useOper("appointAdmin", roomId, props.targetUser, props.onClose);
  const onDismissAdmin = useOper("dismissAdmin", roomId, props.targetUser, props.onClose);
  const onMute = useOper("mute", roomId, props.targetUser, props.onClose);
  const onKick = useOper("kick", roomId, props.targetUser, props.onClose);
  const onBan = useOper("ban", roomId, props.targetUser, props.onClose);
  const onUnban = useOper("unban", roomId, props.targetUser, props.onClose);
  const isOnline = props.subLine?.split(" ")[1] === "온라인" ? true : false;

  function handleDm() {
    props.onDmOpen();
    props.onClose();
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropRef.current && e.target instanceof Element && !dropRef.current.contains(e.target))
        props.onClose();
    };

    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [dropRef]);

  return (
    <>
      <S.DropModalOverlay />
      <S.DropMenuLayout ref={dropRef}>
        <S.DropMenuItemBox
          onClick={() => {
            setProfileUser && onProfile(props.targetUser, setProfileUser, props.onClose);
          }}
        >
          프로필
        </S.DropMenuItemBox>
        <S.DropMenuItemBox onClick={handleDm}>DM 보내기</S.DropMenuItemBox>
        <S.DropMenuItemBox>게임 신청</S.DropMenuItemBox>
        {props.banned && <S.DropMenuItemBox onClick={onUnban}>입장 금지 해제</S.DropMenuItemBox>}
        {!props.banned &&
          props.targetOper &&
          (myOper === "owner" || (myOper === "admin" && props.targetOper === "participant")) && (
            <>
              {props.targetMuted ? (
                <S.DropMenuItemBox disabled>음소거중</S.DropMenuItemBox>
              ) : (
                <S.DropMenuItemBox onClick={onMute}>음소거</S.DropMenuItemBox>
              )}
              <S.DropMenuItemBox onClick={onKick}>내보내기</S.DropMenuItemBox>
              <S.DropMenuItemBox onClick={onBan}>입장 금지</S.DropMenuItemBox>
            </>
          )}
        {!props.banned &&
          props.targetOper &&
          myOper === "owner" &&
          (props.targetOper === "admin" ? (
            <S.DropMenuItemBox onClick={onDismissAdmin}>부방장 해제</S.DropMenuItemBox>
          ) : (
            <S.DropMenuItemBox onClick={onAppointAdmin}>부방장 지정</S.DropMenuItemBox>
          ))}
        {isOnline &&
          (myOper === "owner" || myOper === "admin") &&
          !props.targetOper &&
          !props.banned && (
            <InviteBtn roomId={roomId} username={props.targetUser} close={props.onClose} />
          )}
      </S.DropMenuLayout>
    </>
  );
}
