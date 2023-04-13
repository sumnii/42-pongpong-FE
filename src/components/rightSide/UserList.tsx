import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@api/user";
import * as S from "./style";
import { ChatUserListType } from "ws/chat";

export default function UserList(props: {
  listOf: "friend" | "dm" | "participant" | "player" | "observer";
  setProfileUser: (userId: string) => void;
  chatUserList?: ChatUserListType | null;
}) {
  // 테스트할 때는 회원가입된 다른 유저의 username을 아무개 대신 넣어주세요!
  // 임시 쿼리. 친구 리스트 불러오는 api 필요
  const profileQuery = useQuery({
    queryKey: ["profile", "아무개"],
    queryFn: () => {
      return getProfile("아무개");
    },
  });

  if (profileQuery.isLoading) return <S.UserListLayout></S.UserListLayout>;
  if (profileQuery.isError) console.log(profileQuery.error);

  let cnt = 0;

  return (
    <S.UserListLayout>
      <h3>{props.listOf}</h3>
      <S.UserList>
        {props.listOf === "participant" &&
          props.chatUserList?.userList.map((user) => {
            return (
              <S.UserItem key={cnt++} >
                <S.TmpImg />
                <span>
                  {user.username}
                  <br />
                  {user.owner && "방장"}
                  {user.admin && "관리자"}
                </span>
              </S.UserItem>
            );
          })}
        {props.listOf !== "participant" && (
          <S.UserItem key={1} onClick={() => props.setProfileUser(profileQuery?.data.username)}>
            <S.TmpImg />
            <span>
              {profileQuery?.data?.username}
              <br />
              {profileQuery?.data?.status}
            </span>
          </S.UserItem>
        )}
      </S.UserList>
    </S.UserListLayout>
  );
}
