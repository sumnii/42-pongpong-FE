import * as S from "./style";

export default function UserDropMenu() {
  return (
    <S.DropMenuLayout>
      <S.DropMenuItemBox>프로필</S.DropMenuItemBox>
      <S.DropMenuItemBox>DM 보내기</S.DropMenuItemBox>
      <S.DropMenuItemBox>게임 신청</S.DropMenuItemBox>
      <S.DropMenuItemBox>부방장 지정</S.DropMenuItemBox>
      <S.DropMenuItemBox>내보내기</S.DropMenuItemBox>
      <S.DropMenuItemBox>입장 금지</S.DropMenuItemBox>
    </S.DropMenuLayout>
  );
}
