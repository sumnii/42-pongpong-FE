import { useContext } from "react";
import { ProfileContext } from "hooks/ProfileContext";
import useNotiModal from "hooks/useNotiModal";
import * as S from "./style";

export default function UserInfo(props: {
  username: string;
  icon?: string;
  subLine: string;
  handleDrop?: () => void;
}) {
  const setProfileUser = useContext(ProfileContext);
  const { showNotiModal, NotiModal, onOpenNotiModal, newNoti } = useNotiModal();

  return (
    <>
      {showNotiModal && NotiModal}
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
      {props.handleDrop ||
        (newNoti ? (
          <S.NewNotiIcon onClick={onOpenNotiModal} />
        ) : (
          <S.EmptyNotiIcon onClick={onOpenNotiModal} />
        ))}
    </>
  );
}
