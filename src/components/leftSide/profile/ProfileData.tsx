import { useContext } from "react";
import * as S from "./style";
import { AuthContext } from "@hooks/AuthContext";

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

  const dispatch = useContext(AuthContext)?.authDispatch;
  const handleLogout = () => {
    if (dispatch)
      dispatch({
        type: "signOut",
      });
  };

  return (
    <S.ProfileLayout>
      <h3>프로필</h3>
      {/* 로딩중 기본 이미지 삽입 */}
      <S.TmpImg />
      <S.InfoWrapper>
        <S.InfoLabel>
          닉네임
          <br />
          레이팅
          <br />
          전적
          <br />
          히스토리
        </S.InfoLabel>
        <S.InfoValue>
          {user && user.username}
          <br />
          {user && user.rating}
          <br />
          {user && `${user.win}승 ${user.lose}패`}
          <br />
        </S.InfoValue>
      </S.InfoWrapper>
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
      {user && user.relation === "myself" && <button onClick={handleLogout}>로그아웃</button>}
      {user && user.relation === "friend" && <button>친구 삭제</button>}
      {user && user.relation === "others" && <button>친구 추가</button>}
    </S.ProfileLayout>
  );
}
