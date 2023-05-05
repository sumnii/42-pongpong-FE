import { useRef, useContext, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "hooks/context/ProfileContext";
import { useOper, onProfile } from "hooks/useOper";
import { UserListContext } from "hooks/context/UserListContext";
import { useOutsideClick } from "hooks/useOutsideClick";
import InviteBtn from "./InviteBtn";
import * as T from "@rightSide/rightSideType";
import * as S from "./style";

const ModalLayout = forwardRef(function ModalLayout(
  props: T.ModalLayoutProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <>
      <S.DropModalOverlay />
      <S.DropMenuLayout ref={ref}>{props.children}</S.DropMenuLayout>
    </>
  );
});

// TEST: 게임까지 구현 완료 후 삭제하기
// 전체 필요한것 : onClose / onDmOpen / setProfile / menuFor(friend/participant/banned/player/observer) / targetUser
// friend : 기본[프로필/게임신청/DM 보내기] + 채팅초대 : targetUser, isOnline(게임신청/채팅초대 block)
// participant : 기본 + [차단] + 권한[음소거/내보내기/입장금지] + 방장[부방장 지정] : userOper, targetStatus(oper, muted, blocked, isOnline)
// banned : 기본 + [입장금지 해제]
// player : 기본[프로필/DM 보내기] - 게임신청
// observer : 기본[프로필/게임신청/DM 보내기]

export default function UserDropMenu({
  onClose,
  onDmOpen,
  onInviteGameOpen,
  menuFor,
  targetUser,
  targetStatus,
}: T.DropMenuProps) {
  const setProfileUser = useContext(ProfileContext);
  const myOper = useContext(UserListContext)?.myOper;
  const roomId = Number(useParams().roomId);
  const dropRef = useRef<HTMLDivElement>(null);
  const onAppointAdmin = useOper("appointAdmin", roomId, targetUser, onClose);
  const onDismissAdmin = useOper("dismissAdmin", roomId, targetUser, onClose);
  const onMute = useOper("mute", roomId, targetUser, onClose);
  const onKick = useOper("kick", roomId, targetUser, onClose);
  const onBan = useOper("ban", roomId, targetUser, onClose);
  const onUnban = useOper("unban", roomId, targetUser, onClose);
  const onBlock = useOper("block", roomId, targetUser, onClose);
  const onUnblock = useOper("unblock", roomId, targetUser, onClose);
  useOutsideClick({ modalRef: dropRef, onClose });

  function handleDm() {
    onDmOpen();
    onClose();
  }

  function handleInviteGame() {
    onInviteGameOpen();
    onClose();
  }

  const DefaultMenu = (
    <>
      <S.DropMenuItemBox
        onClick={() => {
          setProfileUser && onProfile(targetUser, setProfileUser, onClose);
        }}
      >
        프로필
      </S.DropMenuItemBox>
      <S.DropMenuItemBox onClick={handleDm}>DM 보내기</S.DropMenuItemBox>
    </>
  );

  const InviteGame =
    targetStatus?.status === "login" ? <S.DropMenuItemBox onClick={handleInviteGame}>게임 신청</S.DropMenuItemBox> : <></>;

  const InviteChat =
    myOper !== "participant" && targetStatus?.status === "login" ? (
      <InviteBtn roomId={roomId} username={targetUser} close={onClose} />
    ) : (
      <></>
    );

  const BlockInChat = targetStatus?.blocked ? (
    <S.DropMenuItemBox onClick={onUnblock}>차단해제</S.DropMenuItemBox>
  ) : (
    <S.DropMenuItemBox onClick={onBlock}>차단</S.DropMenuItemBox>
  );

  const ForAdminInChat = (
    <>
      {targetStatus?.muted ? (
        <S.DropMenuItemBox disabled>음소거중</S.DropMenuItemBox>
      ) : (
        <S.DropMenuItemBox onClick={onMute}>음소거</S.DropMenuItemBox>
      )}
      <S.DropMenuItemBox onClick={onKick}>내보내기</S.DropMenuItemBox>
      <S.DropMenuItemBox onClick={onBan}>입장 금지</S.DropMenuItemBox>
    </>
  );

  const ForOwnerInChat =
    targetStatus?.oper === "admin" ? (
      <S.DropMenuItemBox onClick={onDismissAdmin}>부방장 해제</S.DropMenuItemBox>
    ) : (
      <S.DropMenuItemBox onClick={onAppointAdmin}>부방장 지정</S.DropMenuItemBox>
    );

  const UnBan = <S.DropMenuItemBox onClick={onUnban}>입장 금지 해제</S.DropMenuItemBox>;

  switch (menuFor) {
    case "friend":
      return (
        <ModalLayout ref={dropRef}>
          {DefaultMenu}
          {InviteGame}
          {InviteChat}
        </ModalLayout>
      );
    case "participant":
      return (
        <ModalLayout ref={dropRef}>
          {DefaultMenu}
          {InviteGame}
          {BlockInChat}
          {(myOper === "owner" || (myOper === "admin" && targetStatus?.oper === "participant")) &&
            ForAdminInChat}
          {myOper === "owner" && ForOwnerInChat}
        </ModalLayout>
      );
    case "banned":
      return (
        <ModalLayout ref={dropRef}>
          {DefaultMenu}
          {UnBan}
        </ModalLayout>
      );
    case "player":
      return <ModalLayout ref={dropRef}>{DefaultMenu}</ModalLayout>;
    case "observer":
      return (
        <ModalLayout ref={dropRef}>
          {DefaultMenu}
          {InviteGame}
        </ModalLayout>
      );
    default:
      return null;
  }
}
