import { useQuery } from "@tanstack/react-query";
import { getProfile } from "api/user";
import { getUsername } from "userAuth";
import UserInfo from "./user/UserInfo";
import * as S from "./style";

export default function MyProfile() {
  const username = getUsername();
  const profileQuery = useQuery({
    queryKey: ["profile", username],
    queryFn: () => {
      return getProfile(username);
    },
  });

  if (profileQuery.isLoading) return <S.UserItem />;

  return (
    <S.MyProfileLayout>
      <S.UserItem>
        <UserInfo username={profileQuery?.data?.username} subLine="🔵 온라인" />
      </S.UserItem>
    </S.MyProfileLayout>
  );
}
