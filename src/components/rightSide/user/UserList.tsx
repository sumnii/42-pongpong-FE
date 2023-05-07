import { useContext } from "react";
import { BanListArray, UserListArray } from "socket/passive/chatRoomType";
import { DmListArray } from "socket/passive/friendDmListType";
import UserInfo from "./UserInfo";
import FriendList from "./FriendList";
import { ChatUserListSet, UserListContext } from "hooks/context/UserListContext";
import { PlayerData, SpectatorArray } from "socket/passive/gameType";
import * as S from "../style";

type UserListCase =
  | { listOf: "friend"; list: null }
  | { listOf: "dm"; list: DmListArray | null }
  | { listOf: "participant"; list: UserListArray | null }
  | { listOf: "banned"; list: BanListArray | null }
  | { listOf: "player"; list: PlayerData }
  | { listOf: "spectator"; list: SpectatorArray };

export default function UserList({ listOf, list }: UserListCase) {
  const blockList = (useContext(UserListContext) as ChatUserListSet)?.blocked;

  return (
    <S.UserListLayout>
      <h3>{listOf}</h3>
      <S.UserList>
        {listOf === "participant" &&
          list?.map((user) => {
            const blocked = blockList?.find((data) => {
              return data.username === user.username;
            })
              ? true
              : false;

            return (
              <UserInfo
                key={user.username}
                listOf={listOf}
                username={user.username}
                subLine={
                  user.status === "login"
                    ? "🟣 온라인"
                    : user.status === "logout"
                    ? "⚫️ 오프라인"
                    : "⚫️ 게임중"
                }
                userStatus={{
                  status: user.status,
                  oper: user.owner ? "owner" : user.admin ? "admin" : "participant",
                  muted: user.muted,
                  blocked,
                }}
              />
            );
          })}
        {listOf === "banned" &&
          list?.map((user) => {
            return (
              <UserInfo
                key={user.username}
                listOf={listOf}
                username={user.username}
                subLine="❌ 입장금지"
              />
            );
          })}
        {listOf === "dm" &&
          list?.map((dm) => {
            return (
              <UserInfo
                key={dm.username}
                listOf={listOf}
                username={dm.username}
                subLine={dm.content}
              />
            );
          })}
        {listOf === "friend" && <FriendList listOf={listOf} />}
        {listOf === "player" && (
          <>
            <UserInfo key="red" listOf={listOf} username={list.red} subLine="🟥 red 플레이어" />
            <UserInfo key="blue" listOf={listOf} username={list.blue} subLine="🟦 blue 플레이어" />
          </>
        )}
        {listOf === "spectator" &&
          list.map((user) => {
            const username = user.username;
            return (
              <UserInfo listOf={listOf} key={username} username={username} subLine="👀 관전중" />
            );
          })}
      </S.UserList>
    </S.UserListLayout>
  );
}
