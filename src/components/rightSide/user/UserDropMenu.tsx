import { useEffect, useRef, useContext } from "react";
import { ProfileContext } from "hooks/context/ProfileContext";
import { useOper, onProfile } from "hooks/useOper";
import { RoomIdContext } from "hooks/context/RoomIdContext";
import * as S from "./style";
import { UserListContext } from "hooks/context/UserListContext";

export default function UserDropMenu(props: {
  onClose: () => void;
  targetUser: string;
  targetOper?: string;
  targetMuted?: boolean;
  banned?: boolean;
}) {
  const setProfileUser = useContext(ProfileContext);
  const roomId = useContext(RoomIdContext);
  const dropRef: React.RefObject<HTMLDivElement> = useRef(null);
  const myOper = useContext(UserListContext)?.myOper;
  const onAppointAdmin = useOper("appointAdmin", roomId, props.targetUser, props.onClose);
  const onDismissAdmin = useOper("dismissAdmin", roomId, props.targetUser, props.onClose);
  const onMute = useOper("mute", roomId, props.targetUser, props.onClose);
  const onKick = useOper("kick", roomId, props.targetUser, props.onClose);
  const onBan = useOper("ban", roomId, props.targetUser, props.onClose);
  const onUnban = useOper("unban", roomId, props.targetUser, props.onClose);

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
        <S.DropMenuItemBox>DM 보내기</S.DropMenuItemBox>
        <S.DropMenuItemBox>게임 신청</S.DropMenuItemBox>
        {props.banned && <S.DropMenuItemBox onClick={onUnban}>입장 금지 해제</S.DropMenuItemBox>}
        {(myOper === "owner" ||
          (myOper === "admin" && props.targetOper !== "admin" && props.targetOper !== "owner")) && (
          <>
            {props.targetMuted ? (
              <S.DropMenuItemBox disabled={true}>음소거중</S.DropMenuItemBox>
            ) : (
              <S.DropMenuItemBox onClick={onMute}>음소거</S.DropMenuItemBox>
            )}
            <S.DropMenuItemBox onClick={onKick}>내보내기</S.DropMenuItemBox>
            <S.DropMenuItemBox onClick={onBan}>입장 금지</S.DropMenuItemBox>
          </>
        )}
        {myOper === "owner" &&
          (props.targetOper === "admin" ? (
            // TODO: 부방장 해제
            <S.DropMenuItemBox onClick={onDismissAdmin}>부방장 해제</S.DropMenuItemBox>
          ) : (
            <S.DropMenuItemBox onClick={onAppointAdmin}>부방장 지정</S.DropMenuItemBox>
          ))}
      </S.DropMenuLayout>
    </>
  );
}
