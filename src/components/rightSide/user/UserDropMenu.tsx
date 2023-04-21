import { useEffect, useRef, useContext } from "react";
import { ProfileContext } from "hooks/context/ProfileContext";
import { onProfile } from "./dropFunction";
import { getSocket } from "socket/socket";
import { RoomIdContext } from "hooks/context/RoomIdContext";
import { ChatRoomResponse } from "socket/active/chatEventType";
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
  const socket = getSocket();

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

  function resultHandler(res: ChatRoomResponse) {
    if (res.status === "approved") {
      if (res.roomId === roomId) {
        // TEST : 부방장 이벤트 확인용
        console.log("부방장 지정 승인", res);
      }
    } else console.log(res);
  }

  useEffect(() => {
    socket.on("appointAdminResult", resultHandler);
    return () => {
      socket.off("appointAdminResult", resultHandler);
    };
  }, []);

  function onAppointAdmin() {
    // TEST: 부방장 지정 emit 폼 확인
    console.log("부방장지정 폼", roomId, props.targetUser);
    socket.emit("appointAdmin", {
      roomId,
      username: props.targetUser,
    });
  }

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
