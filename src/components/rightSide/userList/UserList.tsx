import * as S from "./style";

export default function UserList(props: {
  listOf: "friend" | "dm" | "participant" | "player" | "observer";
  setProfileUser: (userId: string) => void;
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
  ];

  return (
    <S.UserListLayout>
      <h3>{props.listOf}</h3>
      <S.UserList>
        {tmpUser.map((user) => {
          return (
            <S.UserItem key={user.id} onClick={() => props.setProfileUser(user.nickname)}>
              <S.TmpImg />
              <span>
                {user.nickname}
                <br />
                {user.status}
              </span>
            </S.UserItem>
          );
        })}
      </S.UserList>
    </S.UserListLayout>
  );
}
