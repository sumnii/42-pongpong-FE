import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAvatar } from "api/user";
import { distroyAuth, getUsername } from "userAuth";
import { AuthContext } from "hooks/context/AuthContext";
import { disconnectSocket } from "socket/socket";
import Modal from "modal/layout/Modal";
import AvatarUploadModal from "modal/AvatarUploadModal";
import * as S from "./style";

interface userProps {
  user?: {
    username: string;
    rating: number;
    win: number;
    lose: number;
    relation: "myself" | "friend" | "others";
    gameHistory: [
      {
        uniqueId: number;
        red: string;
        blue: string;
        redScore: number;
        blueScore: number;
        winner: string;
        type: string;
      },
    ];
  };
}

export function ProfileData(props: userProps) {
  let user;
  if (props) user = props.user;
  const setSigned = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const myProfile = getUsername() === props.user?.username;

  const avatarQuery = useQuery({
    queryKey: ["avatar", `${props.user?.username}`],
    queryFn: () => {
      if (props.user) return getAvatar(props.user.username);
    },
    enabled: !!props.user,
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
            username={props.user?.username}
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
          user.gameHistory &&
          // gameHistory 준비중
          user.gameHistory.map((game) => {
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
        {(!user || user.relation === "myself") && (
          <S.Button
            onClick={() => {
              distroyAuth();
              disconnectSocket();
              if (setSigned) setSigned(false);
              navigate("/");
            }}
          >
            로그아웃
          </S.Button>
        )}
        {user && user.relation === "friend" && <S.Button>친구 삭제</S.Button>}
        {user && user.relation === "others" && <S.Button>친구 추가</S.Button>}
      </S.ButtonBox>
    </S.ProfileLayout>
  );
}
