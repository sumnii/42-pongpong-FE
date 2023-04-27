import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile, getAvatar } from "api/user";
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
  const avatarQuery = useQuery({
    queryKey: ["avatar", `${username}`],
    queryFn: () => {
      if (username) return getAvatar(username);
    },
    enabled: !!username,
  });
  const setProfileUser = useContext(ProfileContext);
  const { showNotiModal, NotiModal, onOpenNotiModal, newNoti } = useNotiModal(profileQuery?.data?.status);
  if (profileQuery.isLoading) return <UserItem />;

  return (
    <MyProfileLayout>
      <UserItem>
        {showNotiModal && NotiModal}
        {avatarQuery.isLoading ? (
          <S.LoadingImg />
        ) : (
          <S.ProfileImg
            clickable
            src={String(avatarQuery.data)}
            onClick={() => {
              setProfileUser && setProfileUser(username);
            }}
          />
        )}
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
