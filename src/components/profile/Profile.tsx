import React from "react";
import * as S from "./style";

export default function Profile() {
  return (
    <S.profileLayout>
      <h3>프로필</h3>
      <S.tmpImg />
      <S.infoWrapper>
        <S.infoLabel>
          닉네임
          <br />
          전적
          <br />
          히스토리
        </S.infoLabel>
        <S.infoValue>
          숨송
          <br />
          1승 1패
          <br />
        </S.infoValue>
      </S.infoWrapper>
      <S.players>
        <S.player>숨송</S.player>
        <S.versus>vs</S.versus>
        <S.player>아무개</S.player>
      </S.players>
      <S.score>3 : 3</S.score>
    </S.profileLayout>
  );
}
