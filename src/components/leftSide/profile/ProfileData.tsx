import { useContext } from "react";
import * as S from "./style";
import { distroyAuth } from "userAuth";
import { AuthContext } from "@hooks/AuthContext";
import { disconnectSocket } from "socket/socket";

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

  return (
    <S.ProfileLayout>
      <S.Title>프로필</S.Title>
      {/* 로딩중 기본 이미지 삽입 */}
      <S.TmpImg />
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
        {!user || user.relation === "myself"}
        <S.Button
          onClick={() => {
            distroyAuth();
            disconnectSocket();
            if (setSigned) setSigned(false);
          }}
        >
          로그아웃
        </S.Button>
        {user && user.relation === "friend" && <S.Button>친구 삭제</S.Button>}
        {user && user.relation === "others" && <S.Button>친구 추가</S.Button>}
      </S.ButtonBox>
    </S.ProfileLayout>
  );
}
