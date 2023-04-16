import { useContext } from "react";
import { ProfileContext } from "@hooks/ProfileContext";
import * as S from "./style";

export default function UserInfo(props: {
  username: string;
  subLine: string;
  handleDrop: () => void;
}) {
  const setProfileUser = useContext(ProfileContext);

  return (
    <>
      <S.TmpImg />
      <S.UserInfo
        onClick={() => {
          setProfileUser && setProfileUser(props.username);
        }}
      >
        {props.username}
        <br />
        {props.subLine}
      </S.UserInfo>
      <S.MoreIcon onClick={props.handleDrop} />
    </>
  );
}
