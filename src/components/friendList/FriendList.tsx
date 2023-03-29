import React from "react";
import * as S from "./style";

export default function FriendList() {
  return (
    <S.freindListLayout>
      <h3>친구목록</h3>
      <S.friendWrapper>
        <S.tmpImg />
        <span>
          친구1
          <br />
          온라인
        </span>
      </S.friendWrapper>
    </S.freindListLayout>
  );
}
