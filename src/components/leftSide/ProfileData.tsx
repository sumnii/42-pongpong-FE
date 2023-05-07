import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAvatar } from "api/user";
import { distroyAuth, getUsername } from "userAuth";
import { AuthContext } from "hooks/context/AuthContext";
import { disconnectSocket } from "socket/socket";
import Modal from "modal/layout/Modal";
import AvatarUploadModal from "modal/AvatarUploadModal";
import AddFriendBtn from "./AddFriendBtn";
import RemoveFrendBtn from "./RemoveFriendBtn";
import { QuerySet, UserProfileProps } from "profile-types";
import * as S from "./style";

export function ProfileData({ user }: UserProfileProps) {
  const setSigned = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const myProfile = getUsername() === user?.username;
  const queryClient = useQueryClient();

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

  function onLogout() {
    distroyAuth();
    disconnectSocket();
    if (setSigned) setSigned(false);
    const querySet = queryClient.getQueriesData(["avatar"]);
    (querySet as QuerySet).map((queryData) => {
      if (queryData[1]) return URL.revokeObjectURL(queryData[1]);
    });
    queryClient.resetQueries(["profile"]);
    queryClient.resetQueries(["avatar"]);
    queryClient.resetQueries(["list"]);
    navigate("/");
  }

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
      <S.InfoLabel>히스토리</S.InfoLabel>
      <S.HistoryList>
        {user &&
          user?.gameHistory.map((game) => {
            return (
              <S.HistoryItem key={game.uniqueId}>
                <S.Score>
                  {game.type === "rank" ? "경쟁" : game.type === "normal" ? "일반" : "아케이드"}전
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
        {(!user || user.relation === "myself") && <S.Button onClick={onLogout}>로그아웃</S.Button>}
        {user && user?.relation === "friend" && <RemoveFrendBtn username={user.username} />}
        {user && user.relation === "others" && <AddFriendBtn username={user.username} />}
      </S.ButtonBox>
    </S.ProfileLayout>
  );
}
