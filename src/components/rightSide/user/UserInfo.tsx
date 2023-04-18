import { useContext } from "react";
import { ProfileContext } from "hooks/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import * as S from "./style";
import useDropModal from "hooks/useDropModal";
import { getUsername } from "userAuth";

export default function UserInfo(props: {
  listOf?: string;
  username: string;
  userOper?: string;
  subLine: string;
  oper?: string | undefined;
}) {
  const setProfileUser = useContext(ProfileContext);
  const { onDropOpen, onDropClose, dropIsOpen } = useDropModal({
    listOf: props.listOf,
    username: props.username,
  });
  const me = getUsername() === props.username;

  return (
    <>
      <S.TmpImg
        me={props.listOf === undefined}
        onClick={() => {
          !props.listOf && setProfileUser && setProfileUser(props.username);
        }}
      />
      <S.UserInfoText
        me={!props.listOf}
        onClick={() => {
          !props.listOf && setProfileUser && setProfileUser(props.username);
        }}
      >
        {props.username}{" "}
        {props.userOper === "owner" ? "👑" : props.userOper === "admin" ? "🎩" : ""}
        <br />
        {props.subLine}
      </S.UserInfoText>
      {props.listOf ? (
        !me && <S.KebabIcon onClick={onDropOpen} />
      ) : (
        <>
          {/* TODO: 새 초대가 있는 경우/없는 경우 조건 추가 */}
          <S.EmptyInviteIcon />
          <S.NewInviteIcon />
        </>
      )}
      {dropIsOpen && (
        <UserDropMenu
          onClose={onDropClose}
          targetUser={props.username}
          targetOper={props.userOper}
          oper={props.oper}
        />
      )}
    </>
  );
}
