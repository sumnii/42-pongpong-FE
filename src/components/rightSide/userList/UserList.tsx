"react"
import * as S from "./style"

export default function UserList(props: {
  listOf: "friend" | "dm" | "participant" | "player" | "observer"
  setProfileUser: (userId: number) => void
}) {
  const tmpUser = [
    {
      id: 1,
      nickname: "아무개",
      status: "온라인",
    },
    {
      id: 2,
      nickname: "아무개개",
      status: "오프라인",
    },
  ]

  return (
    <S.userListLayout>
      <h3>{props.listOf}</h3>
      <S.userList>
        {tmpUser.map((user) => {
          return (
            <S.userItem key={user.id} onClick={() => props.setProfileUser(user.id)}>
              <S.tmpImg />
              <span>
                {user.nickname}
                <br />
                {user.status}
              </span>
            </S.userItem>
          )
        })}
      </S.userList>
    </S.userListLayout>
  )
}
