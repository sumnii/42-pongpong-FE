import { useContext } from "react";
import { BanListArray, UserListArray } from "socket/passive/chatRoomType";
import { DmListArray } from "socket/passive/friendDmListType";
import UserInfo from "./UserInfo";
import FriendList from "./FriendList";
import { ChatUserListSet, UserListContext } from "hooks/context/UserListContext";
import { PlayerData } from "socket/passive/gameType";
import * as S from "../style";

// TODO: 게임 구현 후 타입 파일로 보내기
type UserListCase =
  | { listOf: "friend" }
  | { listOf: "dm"; list: DmListArray | null }
  | { listOf: "participant"; list: UserListArray | null }
  | { listOf: "banned"; list: BanListArray | null }
  | { listOf: "player"; list: PlayerData }
  | { listOf: "spectator"; list: string[] };

export default function UserList(props: UserListCase) {
  const blockList = (useContext(UserListContext) as ChatUserListSet)?.blocked;

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
        {props.listOf === "player" && (
          <>
            <UserInfo
              key="red"
              listOf={props.listOf}
              username={props.list.red}
              subLine="🟥 red 플레이어"
            />
            <UserInfo
              key="blue"
              listOf={props.listOf}
              username={props.list.blue}
              subLine="🟦 blue 플레이어"
            />
          </>
        )}
        {props.listOf === "spectator" &&
          props.list.map((user) => {
            return (
              <UserInfo listOf={props.listOf} key={user} username={user} subLine="👀 관전중" />
            );
          })}
      </S.UserList>
    </S.UserListLayout>
  );
}
