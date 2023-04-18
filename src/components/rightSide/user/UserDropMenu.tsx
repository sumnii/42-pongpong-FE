import { useEffect, useRef } from "react";
import * as S from "./style";

export default function UserDropMenu(props: { onClose: () => void }) {
  const dropRef: React.RefObject<HTMLDivElement> = useRef(null);

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
        <S.DropMenuItemBox>프로필</S.DropMenuItemBox>
        <S.DropMenuItemBox>DM 보내기</S.DropMenuItemBox>
        <S.DropMenuItemBox>게임 신청</S.DropMenuItemBox>
        <S.DropMenuItemBox>부방장 지정</S.DropMenuItemBox>
        <S.DropMenuItemBox>내보내기</S.DropMenuItemBox>
        <S.DropMenuItemBox>입장 금지</S.DropMenuItemBox>
      </S.DropMenuLayout>
    </>
  );
}
