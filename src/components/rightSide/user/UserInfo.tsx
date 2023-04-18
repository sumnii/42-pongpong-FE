import { useContext } from "react";
import { ProfileContext } from "hooks/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import * as S from "./style";
import useDropModal from "hooks/useDropModal";

export default function UserInfo(props: {
  listOf?: string;
  username: string;
  icon?: string;
  subLine: string;
}) {
  const setProfileUser = useContext(ProfileContext);
  const { onDropOpen, onDropClose, dropIsOpen } = useDropModal({
    listOf: props.listOf,
    username: props.username,
  });

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
      {props.listOf ? (
        <S.KebabIcon onClick={onDropOpen} />
      ) : (
        <>
          {/* TODO: 새 초대가 있는 경우/없는 경우 조건 추가 */}
          <S.EmptyInviteIcon />
          <S.NewInviteIcon />
        </>
      )}
      {dropIsOpen && <UserDropMenu onClose={onDropClose} userOper={props.icon} />}
    </>
  );
}
