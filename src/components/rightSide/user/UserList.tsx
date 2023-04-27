import { useQuery } from "@tanstack/react-query";
import { getProfile } from "api/user";
import { BanListArray, UserListArray } from "socket/passive/chatRoomType";
import { DmListArray } from "socket/passive/friendDmListType";
import UserInfo from "./UserInfo";
import * as S from "../style";
import FriendList from "./FriendList";

type UserListCase =
  | { listOf: "friend" | "player" | "observer" }
  | { listOf: "dm"; list: DmListArray | null }
  | { listOf: "participant"; list: UserListArray | null }
  | { listOf: "banned"; list: BanListArray | null };

export default function UserList(props: UserListCase) {
  // 임시 쿼리. 친구 리스트 불러오는 api 필요
  const profileQuery = useQuery({
    queryKey: ["profile", "아무개"],
    queryFn: () => {
      return getProfile("아무개");
    },
  });

  if (profileQuery.isLoading) return <S.UserListLayout></S.UserListLayout>;
  if (profileQuery.isError) console.log(profileQuery.error);

  return (
    <S.UserListLayout>
      <h3>{props.listOf}</h3>
      <S.UserList>
        {props.listOf === "participant" &&
          props.list?.map((user) => {
            return (
              <UserInfo
                key={user.username}
                listOf={props.listOf}
                username={user.username}
                userOper={user.owner ? "owner" : user.admin ? "admin" : "participant"}
                subLine={user.login ? "🟣 온라인" : "⚫️ 오프라인"}
                muted={user.muted ? true : false}
              />
            );
          })}
        {props.listOf === "banned" &&
          props.list?.map((user) => {
            return (
              <UserInfo
                key={user.username}
                listOf={props.listOf}
                username={user.username}
                subLine="❌ 입장금지"
                banned
              />
            );
          })}
        {props.listOf === "dm" &&
          props.list?.map((dm) => {
            return (
              <UserInfo
                key={dm.username}
                listOf={props.listOf}
                username={dm.username}
                subLine={dm.content}
              />
            );
          })}
        {props.listOf === "friend" && <FriendList listOf={props.listOf} />}
      </S.UserList>
    </S.UserListLayout>
  );
}
