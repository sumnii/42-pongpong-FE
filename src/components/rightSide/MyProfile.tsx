import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "api/user";
import { getUsername } from "userAuth";
import useNotiModal from "hooks/useNotiModal";
import { ProfileContext } from "hooks/context/ProfileContext";
import { MyProfileLayout } from "./style";
import { UserItem } from "./user/style";
import * as S from "./user/style";

export default function MyProfile() {
  const username = getUsername();
  const profileQuery = useQuery({
    queryKey: ["profile", username],
    queryFn: () => {
      return getProfile(username);
    },
  });
  const setProfileUser = useContext(ProfileContext);
  const { showNotiModal, NotiModal, onOpenNotiModal, newNoti } = useNotiModal();

  if (profileQuery.isLoading) return <UserItem />;

  return (
    <MyProfileLayout>
      <UserItem>
        {showNotiModal && NotiModal}
        <S.TmpImg
          clickable
          // src={img} TODO: 로그인한 유저 프로필 이미지 불러오기 필요
          onClick={() => {
            setProfileUser && setProfileUser(username);
          }}
        />
        <S.UserInfoText
          clickable
          onClick={() => {
            setProfileUser && setProfileUser(username);
          }}
        >
          {profileQuery?.data?.username}
          <br />
          🟣 온라인
        </S.UserInfoText>
        {newNoti ? (
          <S.NewNotiIcon onClick={onOpenNotiModal} />
        ) : (
          <S.EmptyNotiIcon onClick={onOpenNotiModal} />
        )}
      </UserItem>
    </MyProfileLayout>
  );
}
