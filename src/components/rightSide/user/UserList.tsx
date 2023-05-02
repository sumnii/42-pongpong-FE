import { useContext } from "react";
import { BanListArray, UserListArray } from "socket/passive/chatRoomType";
import { DmListArray } from "socket/passive/friendDmListType";
import UserInfo from "./UserInfo";
import FriendList from "./FriendList";
import { UserListContext } from "hooks/context/UserListContext";
import * as S from "../style";

type UserListCase =
  | { listOf: "friend" | "player" | "observer" }
  | { listOf: "dm"; list: DmListArray | null }
  | { listOf: "participant"; list: UserListArray | null }
  | { listOf: "banned"; list: BanListArray | null };

export default function UserList(props: UserListCase) {
  const blockList = useContext(UserListContext)?.blocked;

  return (
    <S.UserListLayout>
      <h3>{props.listOf}</h3>
      <S.UserList>
        {props.listOf === "participant" &&
          props.list?.map((user) => {
            const blocked = blockList?.find((data) => {
              return data.username === user.username;
            })
              ? true
              : false;

            return (
              <UserInfo
                key={user.username}
                listOf={props.listOf}
                username={user.username}
                subLine={user.status === "login" ? "🟣 온라인" : "⚫️ 오프라인"}
                userStatus={{
                  status: user.status,
                  oper: user.owner ? "owner" : user.admin ? "admin" : "participant",
                  muted: user.muted,
                  blocked,
                }}
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
