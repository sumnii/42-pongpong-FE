import { useContext } from "react";
import { ProfileContext } from "hooks/ProfileContext";
import UserDropMenu from "./UserDropMenu";
import useNotiModal from "hooks/useNotiModal";
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
  const me = getUsername() === props.username;
  const { onDropOpen, onDropClose, dropIsOpen } = useDropModal({
    listOf: props.listOf,
    username: props.username,
  });
  const { showNotiModal, NotiModal, onOpenNotiModal, newNoti } = useNotiModal();

  return (
    <>
      {showNotiModal && NotiModal}
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
      ) : 
        newNoti ? (
          <S.NewNotiIcon onClick={onOpenNotiModal} />
        ) : (
          <S.EmptyNotiIcon onClick={onOpenNotiModal} />
        )
      }
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
