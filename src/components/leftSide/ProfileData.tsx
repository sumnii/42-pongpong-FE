import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAvatar } from "api/user";
import { getUsername } from "userAuth";
import Modal from "modal/layout/Modal";
import AvatarUploadModal from "modal/AvatarUploadModal";
import AddFriendBtn from "./buttons/AddFriendBtn";
import RemoveFrendBtn from "./buttons/RemoveFriendBtn";
import LogoutBtn from "./buttons/LogoutBtn";
import { UserProfileProps } from "profile-types";
import AchievementBadge from "./AchievementBadge";
import * as S from "./style";

export function ProfileData({ user }: UserProfileProps) {
  const [showModal, setShowModal] = useState(false);
  const myProfile = getUsername() === user?.username;

  const avatarQuery = useQuery({
    queryKey: ["avatar", `${user?.username}`],
    queryFn: () => {
      if (user) return getAvatar(user.username);
    },
    enabled: !!user,
  });

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <S.ProfileLayout>
      {showModal && (
        <Modal setView={closeModalHandler}>
          <AvatarUploadModal
            close={closeModalHandler}
            prevUrl={String(avatarQuery.data)}
            username={user?.username}
          />
        </Modal>
      )}
      <S.Title>프로필</S.Title>
      {avatarQuery.isLoading ? (
        <S.LoadingImg />
      ) : (
        <S.ProfileImg
          me={myProfile}
          src={String(avatarQuery.data)}
          onClick={myProfile ? openModalHandler : undefined}
        />
      )}
      <S.InfoWrapper>
        <S.InfoLabel>
          닉네임
          <br />
          레이팅
          <br />
          전적
        </S.InfoLabel>
        <S.InfoValue>
          {user && user.username}
          <br />
          {user && user.rating}
          <br />
          {user && `${user.win}승 ${user.lose}패`}
        </S.InfoValue>
      </S.InfoWrapper>
      <AchievementBadge achivements={user?.achievement} />
      <S.InfoLabel>히스토리</S.InfoLabel>
      <S.HistoryList>
        {user &&
          user?.gameHistory.map((game) => {
            return (
              <S.HistoryItem key={game.id}>
                <S.Score>
                  {game.rule === "rank" ? "경쟁" : game.rule === "normal" ? "일반" : "아케이드"}전
                </S.Score>
                <S.Players>
                  <S.Player>{game.red}</S.Player>
                  <S.Versus>vs</S.Versus>
                  <S.Player>{game.blue}</S.Player>
                </S.Players>
                <S.Score>
                  {game.redScore} : {game.blueScore}
                </S.Score>
              </S.HistoryItem>
            );
          })}
      </S.HistoryList>
      <S.ButtonBox>
        {(!user || user.relation === "myself") && <LogoutBtn />}
        {user && user?.relation === "friend" && <RemoveFrendBtn username={user.username} />}
        {user && user.relation === "others" && <AddFriendBtn username={user.username} />}
      </S.ButtonBox>
    </S.ProfileLayout>
  );
}
