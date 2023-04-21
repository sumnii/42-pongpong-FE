import { useState } from "react";
import UserList from "./user/UserList";
import * as S from "./style";

export default function FriendAndDmBar() {
  const [isOpen, setIsOpen] = useState<"friend" | "dm" | "">("");
  const [isNewDm, setIsNewDm] = useState(true);
  // TODO: dm 이벤트에 따라 set 함수 사용

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const id = e.currentTarget.id;
    if (id === "dm") setIsNewDm(false);
    if (id === "friend" || id === "dm") setIsOpen(id);
    if (id === isOpen) setIsOpen("");
  }

  return (
    <>
      <S.BarLayout>
        <S.IconWrapper id="friend" onClick={handleClick}>
          <S.FriendIcon />
        </S.IconWrapper>
        <S.IconWrapper id="dm" onClick={handleClick}>
          {isNewDm ? <S.NewDmIcon /> : <S.DmIcon />}
        </S.IconWrapper>
      </S.BarLayout>
      {isOpen && <UserList listOf={isOpen} />}
    </>
  );
}
