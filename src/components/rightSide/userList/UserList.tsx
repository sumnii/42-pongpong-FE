import React from "react";
import * as S from "./style";

export default function UserList(props: {
  listOf: "friend" | "dm" | "participant" | "player" | "observer";
}) {
  return (
    <S.userListLayout>
      <h3>{props.listOf}</h3>
      <S.userWrapper>
        <S.tmpImg />
        <span>
          친구1
          <br />
          온라인
        </span>
      </S.userWrapper>
    </S.userListLayout>
  );
}
