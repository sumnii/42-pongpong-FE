import { useEffect, useRef, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "hooks/context/ProfileContext";
import { useOper, onProfile } from "hooks/useOper";
import { UserListContext } from "hooks/context/UserListContext";
import InviteBtn from "./InviteBtn";
import * as S from "./style";

type DropMenuProps = {
  onClose: () => void;
  onDmOpen: () => void;
  targetUser: string;
  targetOper?: string;
  targetMuted?: boolean;
  targetBlocked?: boolean;
  banned?: boolean;
  subLine?: string;
};

export default function UserDropMenu({
  onClose,
  onDmOpen,
  targetUser,
  targetOper,
  targetMuted,
  targetBlocked,
  banned,
  subLine,
}: DropMenuProps) {
  const setProfileUser = useContext(ProfileContext);
  const roomId = Number(useParams().roomId);
  const dropRef: React.RefObject<HTMLDivElement> = useRef(null);
  const myOper = useContext(UserListContext)?.myOper;
  const onAppointAdmin = useOper("appointAdmin", roomId, targetUser, onClose);
  const onDismissAdmin = useOper("dismissAdmin", roomId, targetUser, onClose);
  const onMute = useOper("mute", roomId, targetUser, onClose);
  const onKick = useOper("kick", roomId, targetUser, onClose);
  const onBan = useOper("ban", roomId, targetUser, onClose);
  const onUnban = useOper("unban", roomId, targetUser, onClose);
  const onBlock = useOper("block", roomId, targetUser, onClose);
  const onUnblock = useOper("unblock", roomId, targetUser, onClose);
  const isOnline = subLine?.split(" ")[1] === "온라인" ? true : false;

  function handleDm() {
    onDmOpen();
    onClose();
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropRef.current && e.target instanceof Element && !dropRef.current.contains(e.target))
        onClose();
    };

    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [dropRef]);

  return (
    <>
      {/* TODO: 노출 조건 분리 필요 */}
      <S.DropModalOverlay />
      <S.DropMenuLayout ref={dropRef}>
        <S.DropMenuItemBox
          onClick={() => {
            setProfileUser && onProfile(targetUser, setProfileUser, onClose);
          }}
        >
          프로필
        </S.DropMenuItemBox>
        <S.DropMenuItemBox onClick={handleDm}>DM 보내기</S.DropMenuItemBox>
        <S.DropMenuItemBox>게임 신청</S.DropMenuItemBox>
        {!banned && targetOper && myOper && targetBlocked ? (
          <S.DropMenuItemBox onClick={onUnblock}>차단해제</S.DropMenuItemBox>
        ) : (
          <S.DropMenuItemBox onClick={onBlock}>차단</S.DropMenuItemBox>
        )}
        {banned && <S.DropMenuItemBox onClick={onUnban}>입장 금지 해제</S.DropMenuItemBox>}
        {!banned &&
          targetOper &&
          (myOper === "owner" || (myOper === "admin" && targetOper === "participant")) && (
            <>
              {targetMuted ? (
                <S.DropMenuItemBox disabled>음소거중</S.DropMenuItemBox>
              ) : (
                <S.DropMenuItemBox onClick={onMute}>음소거</S.DropMenuItemBox>
              )}
              <S.DropMenuItemBox onClick={onKick}>내보내기</S.DropMenuItemBox>
              <S.DropMenuItemBox onClick={onBan}>입장 금지</S.DropMenuItemBox>
            </>
          )}
        {!banned &&
          targetOper &&
          myOper === "owner" &&
          (targetOper === "admin" ? (
            <S.DropMenuItemBox onClick={onDismissAdmin}>부방장 해제</S.DropMenuItemBox>
          ) : (
            <S.DropMenuItemBox onClick={onAppointAdmin}>부방장 지정</S.DropMenuItemBox>
          ))}
        {isOnline && myOper && myOper !== "participant" && !targetOper && !banned && (
          <InviteBtn roomId={roomId} username={targetUser} close={onClose} />
        )}
      </S.DropMenuLayout>
    </>
  );
}
