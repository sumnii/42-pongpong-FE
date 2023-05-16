import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAvatar } from "api/user";
import { getUsername } from "userAuth";
import AvartarModal from "modal/layout/Modal";
import AvatarUploadModal from "modal/AvatarUploadModal";
import AddFriendBtn from "./buttons/AddFriendBtn";
import RemoveFrendBtn from "./buttons/RemoveFriendBtn";
import LogoutBtn from "./buttons/LogoutBtn";
import { UserProfileProps } from "profile-types";
import AchievementBadge from "./AchievementBadge";
import useModal from "hooks/useModal";
import UserSetting from "./UserSetting";
import * as S from "./style";

export function ProfileData({ user }: UserProfileProps) {
  const [showModal, setShowModal] = useState(false);
  const myProfile = getUsername() === user?.username;
  const { Modal, isOpen, onOpen, onClose } = useModal();

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
      {isOpen && (
        <Modal>
          <UserSetting handleClose={onClose} />
        </Modal>
      )}
      {showModal && (
        <AvartarModal setView={closeModalHandler}>
          <AvatarUploadModal
            close={closeModalHandler}
            prevUrl={String(avatarQuery.data)}
            username={user?.username}
          />
        </AvartarModal>
      )}
      <S.HeaderBox>
        <S.Title>프로필</S.Title>
        {myProfile && <S.SettingBtn onClick={onOpen} />}
      </S.HeaderBox>
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
        <S.InfoLabel>닉네임</S.InfoLabel>
        <S.InfoValue>{user && user.username}</S.InfoValue>
      </S.InfoWrapper>
      <S.InfoWrapper>
        <S.InfoLabel>레이팅</S.InfoLabel>
        <S.InfoValue>{user && user.rating}</S.InfoValue>
      </S.InfoWrapper>
      <S.InfoWrapper>
        <S.InfoLabel>전적</S.InfoLabel>
        <S.InfoValue>{user && `${user.win}승 ${user.lose}패`}</S.InfoValue>
      </S.InfoWrapper>
      <AchievementBadge achivements={user?.achievement} username={user?.username} />
      <S.InfoLabel>히스토리</S.InfoLabel>
      <S.HistoryList>
        {user?.gameHistory.map((game) => {
          return (
            <S.HistoryItem key={game.id}>
              <S.Rule>
                🚩 {game.rule === "rank" ? "경쟁" : game.rule === "normal" ? "일반" : "아케이드"}전
              </S.Rule>
              <S.Players>
                <S.Player winner={game.winner === "red"}>{game.red}</S.Player>
                <S.Versus>vs</S.Versus>
                <S.Player winner={game.winner === "blue"}>{game.blue}</S.Player>
              </S.Players>
              <S.ScoreBox>
                <S.Score red winner={game.winner === "red"}>
                  {game.redScore}
                </S.Score>
                <S.Versus>:</S.Versus>
                <S.Score blue winner={game.winner === "blue"}>
                  {game.blueScore}
                </S.Score>
              </S.ScoreBox>
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
