import React from "react";
import * as S from "./style";

export default function DmList() {
  return (
    <S.dmListLayout>
      <h3>DM 목록</h3>
      <S.dmWrapper>
        <S.tmpImg />
        <S.textWrapper>
          친구1
          <br />
          내가 마지막에 했던 말은..
        </S.textWrapper>
      </S.dmWrapper>
    </S.dmListLayout>
  );
}
