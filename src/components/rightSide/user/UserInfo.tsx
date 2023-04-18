import { useCallback, useContext } from "react";
import { UserDropContext } from "hooks/UserDropContext";
import { ProfileContext } from "hooks/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import * as S from "./style";

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

  const onClose = useCallback(() => {
    dropped?.userSet("");
  }, []);

  function onOpen() {
    dropped?.userSet(droppedUser);
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
      {droppedUser && <S.KebabIcon onClick={onOpen} />}
      {droppedUser && dropped?.user === droppedUser && <UserDropMenu onClose={onClose} />}
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
