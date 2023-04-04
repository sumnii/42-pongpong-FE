import * as S from "./style";

interface userProps {
  user?: {
    username: string;
    rating: number;
    win: number;
    lose: number;
    gameHistory: [
      {
        id: number;
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

  return (
    <S.profileLayout>
      <h3>프로필</h3>
      {/* 로딩중 기본 이미지 삽입 */}
      <S.tmpImg />
      <S.infoWrapper>
        <S.infoLabel>
          닉네임
          <br />
          전적
          <br />
          히스토리
        </S.infoLabel>
        <S.infoValue>
          {user ? user.username : ""}
          <br />
          {user ? `${user.win}승 ${user.lose}패` : ""}
          <br />
        </S.infoValue>
      </S.infoWrapper>
      {user &&
        user.gameHistory.map((game) => {
          return (
            <S.historyItem key={game.id}>
              <S.score>{game.type === "rank" ? "경쟁" : "일반"}전</S.score>
              <S.players>
                <S.player>{game.red}</S.player>
                <S.versus>vs</S.versus>
                <S.player>{game.blue}</S.player>
              </S.players>
              <S.score>
                {game.redScore} : {game.blueScore}
              </S.score>
            </S.historyItem>
          );
        })}
    </S.profileLayout>
  );
}
