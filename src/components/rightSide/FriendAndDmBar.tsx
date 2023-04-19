import { useState } from "react";
import * as S from "./style";
import UserList from "./user/UserList";

export default function FriendAndDmBar() {
  const [isOpen, setIsOpen] = useState("");
  const [isNewDm, setIsNewDm] = useState(true);
  // TODO: dm 이벤트에 따라 set 함수 사용

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.currentTarget.id === "dm") setIsNewDm(false);
    if (e.currentTarget.id === isOpen) setIsOpen("");
    else setIsOpen(e.currentTarget.id);
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
