import { useState } from "react";
import * as S from "./style";
import UserList from "./user/UserList";

export default function FriendAndDmBar() {
  const [isOpen, setIsOpen] = useState("");
  const [isNewDm, setIsNewDm] = useState(true);
  // TODO: dm 이벤트에 따라 set 함수 사용

  function handleClick(e) {
    e.stopPropagation();
    console.log(e.target);
    // console.log(e.target.id);
    if (e.target.id === isOpen) setIsOpen("");
    else setIsOpen(e.target.id);
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
