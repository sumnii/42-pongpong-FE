import React from "react"
import * as S from "./style"

export default function Profile(props: { userId: number }) {
  const tmpUser = [
    {
      id: 0,
      nickname: "숨송",
      status: "온라인",
      record: {
        win: 3,
        lose: 1,
      },
      gameHistory: [
        {
          id: 1,
          player1: "숨송",
          player2: "아무개",
          player1score: 4,
          player2score: 6,
        },
      ],
    },
    {
      id: 1,
      nickname: "아무개",
      status: "온라인",
      record: {
        win: 2,
        lose: 2,
      },
      gameHistory: [
        {
          id: 1,
          player1: "숨송",
          player2: "아무개",
          player1score: 4,
          player2score: 6,
        },
      ],
    },
    {
      id: 2,
      nickname: "아무개개",
      status: "오프라인",
      record: {
        win: 0,
        lose: 0,
      },
      gameHistory: [],
    },
  ]

  const user = tmpUser.filter((user) => user.id === props.userId)[0]

  return (
    <S.profileLayout>
      <h3>{props.userId === 0 ? "내 프로필" : "친구 프로필"}</h3>
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
          {user.nickname}
          <br />
          {user.record.win}승 {user.record.win}패
          <br />
        </S.infoValue>
      </S.infoWrapper>
      {user.gameHistory &&
        user.gameHistory.map((game) => {
          return (
            <S.historyItem key={game.id}>
              <S.players>
                <S.player>{game.player1}</S.player>
                <S.versus>vs</S.versus>
                <S.player>{game.player2}</S.player>
              </S.players>
              <S.score>
                {game.player1score} : {game.player2score}
              </S.score>
            </S.historyItem>
          )
        })}
    </S.profileLayout>
  )
}
