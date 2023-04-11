import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@api/user";
import { getUsername } from "userAuth";
import * as S from "./style";

export default function MyProfile(props: { setProfileUser: (userId: string) => void }) {
  const username = getUsername();
  const profileQuery = useQuery({
    queryKey: ["user", username],
    queryFn: () => {
      return getProfile(username);
    },
  });

  if (profileQuery.isLoading) return <S.UserItem />;

  return (
    <S.MyProfileLayout>
      <S.UserItem onClick={() => props.setProfileUser(profileQuery?.data.username)}>
        <S.TmpImg />
        <span>
          {profileQuery?.data?.username}
          <br />
          {profileQuery?.data?.status}
        </span>
      </S.UserItem>
    </S.MyProfileLayout>
  );
}
