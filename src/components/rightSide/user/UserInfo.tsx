import { useContext } from "react";
import { ProfileContext } from "hooks/ProfileContext";
import * as S from "./style";

export default function UserInfo(props: {
  username: string;
  icon?: string;
  subLine: string;
  handleDrop?: () => void;
}) {
  const setProfileUser = useContext(ProfileContext);

  return (
    <>
      <S.TmpImg
        onClick={() => {
          setProfileUser && setProfileUser(props.username);
        }}
      />
      <S.UserInfoText
        onClick={() => {
          setProfileUser && setProfileUser(props.username);
        }}
      >
        {props.username} {props.icon}
        <br />
        {props.subLine}
      </S.UserInfoText>
      {props.handleDrop && <S.KebabIcon onClick={props.handleDrop} />}
      {/* TODO: props.handleDrop 대신 알림 모달창 띄우는 handler를 prop으로 받아 조건 변경 필요 */}
      {props.handleDrop || (
        <>
          {/* TODO: 새 초대가 있는 경우/없는 경우 조건 추가 */}
          <S.EmptyInviteIcon />
          <S.NewInviteIcon />
        </>
      )}
    </>
  );
}
