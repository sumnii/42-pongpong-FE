import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@api/user";
import { ChatUserListType } from "socket/chat";
import UserInfo from "./UserInfo";
import * as S from "./style";

export default function UserList(props: {
  listOf: "friend" | "dm" | "participant" | "banned" | "player" | "observer";
  chatUserList?: ChatUserListType | null;
}) {
  const [isDrop, setIsDrop] = useState(false);

  // 임시 쿼리. 친구 리스트 불러오는 api 필요
  const profileQuery = useQuery({
    queryKey: ["profile", "아무개"],
    queryFn: () => {
      return getProfile("아무개");
    },
  });

  if (profileQuery.isLoading) return <S.UserListLayout></S.UserListLayout>;
  if (profileQuery.isError) console.log(profileQuery.error);

  // friend, dm -> 메인/소켓
  // participant, banned -> 채팅/소켓
  // player, observer -> 게임/소켓

  // 유저네임 받을 예정
  function handleDrop() {
    setIsDrop(!isDrop);
  }

  return (
    <S.UserListLayout>
      <h3>{props.listOf}</h3>
      <S.UserList>
        {props.listOf === "participant" &&
          props.chatUserList?.userList.map((user) => {
            return (
              <S.UserItem key={user.username}>
                <UserInfo
                  username={user.username + (user.owner ? " 👑" : user.admin ? " 🎩" : "")}
                  subLine={user.login ? "🔵 온라인" : "⚫️ 오프라인"}
                  handleDrop={handleDrop}
                />
                {isDrop && <>hihi</>}
              </S.UserItem>
            );
          })}
        {props.listOf !== "participant" && (
          // 이벤트에 대한 데이터. key 값에 username 넣을 예정
          <S.UserItem>
            <UserInfo
              username={profileQuery?.data?.username}
              subLine={profileQuery?.data?.status === "login" ? "🔵 온라인" : "⚫️ 오프라인"}
              handleDrop={handleDrop}
            />
            {isDrop && <>hihi</>}
          </S.UserItem>
        )}
      </S.UserList>
    </S.UserListLayout>
  );
}
