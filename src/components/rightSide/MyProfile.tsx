import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@api/user";
import { getUsername } from "userAuth";
import { useContext } from "react";
import { ProfileContext } from "@hooks/ProfileContext";
import * as S from "./style";

export default function MyProfile() {
  const username = getUsername();
  const profileQuery = useQuery({
    queryKey: ["profile", username],
    queryFn: () => {
      return getProfile(username);
    },
  });
  const setProfileUser = useContext(ProfileContext);

  if (profileQuery.isLoading) return <S.UserItem />;

  return (
    <S.MyProfileLayout>
      <S.UserItem
        onClick={() => {
          setProfileUser && setProfileUser(profileQuery.data?.username);
        }}
      >
        <S.TmpImg />
        <span>
          {profileQuery.data?.username}
          <br />
          🔵 온라인
        </span>
      </S.UserItem>
    </S.MyProfileLayout>
  );
}
