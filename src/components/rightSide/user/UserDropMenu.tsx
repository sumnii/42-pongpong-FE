import { useEffect, useRef, useContext } from "react";
import { ProfileContext } from "hooks/context/ProfileContext";
import { onProfile } from "./dropFunction";
import { useAppointAdmin } from "hooks/dropFunc/useAppointAdmin";
import { RoomIdContext } from "hooks/context/RoomIdContext";
import * as S from "./style";

export default function UserDropMenu(props: {
  onClose: () => void;
  targetUser: string;
  targetOper?: string;
  oper?: string;
}) {
  const setProfileUser = useContext(ProfileContext);
  const roomId = useContext(RoomIdContext);
  const dropRef: React.RefObject<HTMLDivElement> = useRef(null);
  const { onAppointAdmin } = useAppointAdmin(roomId, props.targetUser);

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
        {(props.oper === "owner" ||
          (props.oper === "admin" &&
            props.targetOper !== "admin" &&
            props.targetOper !== "owner")) && (
          <>
            <S.DropMenuItemBox>음소거</S.DropMenuItemBox>
            <S.DropMenuItemBox>내보내기</S.DropMenuItemBox>
            <S.DropMenuItemBox>입장 금지</S.DropMenuItemBox>
          </>
        )}
        {props.oper === "owner" && (
          <S.DropMenuItemBox onClick={onAppointAdmin}>부방장 지정</S.DropMenuItemBox>
        )}
      </S.DropMenuLayout>
    </>
  );
}
