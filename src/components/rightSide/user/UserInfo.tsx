import { useContext } from "react";
import { ProfileContext } from "hooks/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import * as S from "./style";
import { UserDropContext } from "hooks/UserDropContext";

export default function UserInfo(props: {
  listOf?: string;
  username: string;
  icon?: string;
  subLine: string;
}) {
  const setProfileUser = useContext(ProfileContext);
  const dropped = useContext(UserDropContext);
  let droppedUser = "";
  if (props.listOf) droppedUser = props.listOf + props.username;

  function handleDrop() {
    if (dropped?.user === droppedUser) dropped?.userSet("");
    else dropped?.userSet(props.listOf + props.username);
  }

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
      {droppedUser && <S.KebabIcon onClick={handleDrop} />}
      {droppedUser && dropped?.user === droppedUser && <UserDropMenu />}
      {!props.listOf && (
        <>
          {/* TODO: 새 초대가 있는 경우/없는 경우 조건 추가 */}
          <S.EmptyInviteIcon />
          <S.NewInviteIcon />
        </>
      )}
    </>
  );
}
