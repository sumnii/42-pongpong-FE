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
      <S.UserInfo
        onClick={() => {
          setProfileUser && setProfileUser(props.username);
        }}
      >
        {props.username} {props.icon}
        <br />
        {props.subLine}
      </S.UserInfo>
      {props.handleDrop && <S.MoreIcon onClick={props.handleDrop} />}
    </>
  );
}
