import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "api/user";
import { getSocket } from "socket/socket";
import { ChatUserListType } from "socket/chat";
import UserInfo from "./UserInfo";
import * as S from "../style";

// friend, dm -> 메인/소켓
// participant, banned -> 채팅/소켓
// player, observer -> 게임/소켓
export default function UserList(props: {
  listOf: "friend" | "dm" | "participant" | "banned" | "player" | "observer" | string;
}) {
  const [chatUserList, setChatUserList] = useState<ChatUserListType | null>(null);
  const socket = getSocket();

  const listener = (res: ChatUserListType) => {
    setChatUserList(res);
  };

  useEffect(() => {
    socket.on("updateChatRoom", listener);
    return () => {
      socket.off("updateChatRoom", listener);
    };
  });

  // 임시 쿼리. 친구 리스트 불러오는 api 필요
  const profileQuery = useQuery({
    queryKey: ["profile", "아무개"],
    queryFn: () => {
      return getProfile("아무개");
    },
  });

  if (profileQuery.isLoading) return <S.UserListLayout></S.UserListLayout>;
  if (profileQuery.isError) console.log(profileQuery.error);

  // TODO : user list 받아와서 전체 값 통일하기
  return (
    <S.UserListLayout>
      <h3>{props.listOf}</h3>
      <S.UserList>
        {props.listOf === "participant" &&
          chatUserList?.userList.map((user) => {
            return (
              <S.UserItem key={user.username}>
                <UserInfo
                  listOf={props.listOf}
                  username={user.username}
                  icon={user.owner ? "👑" : user.admin ? "🎩" : ""}
                  subLine={user.login ? "🔵 온라인" : "⚫️ 오프라인"}
                />
              </S.UserItem>
            );
          })}
        {
          // TODO: 소켓 이벤트 데이터 연동 필요, key 값에 username
          props.listOf === "banned" && (
            <S.UserItem>
              <UserInfo
                listOf={props.listOf}
                username={profileQuery.data?.username}
                subLine="❌ 입장금지"
              />
            </S.UserItem>
          )
        }
        {!["participant", "banned"].includes(props.listOf) && (
          <S.UserItem>
            <UserInfo
              listOf={props.listOf}
              username={profileQuery.data?.username}
              subLine={profileQuery.data?.status === "login" ? "🔵 온라인" : "⚫️ 오프라인"}
            />
          </S.UserItem>
        )}
      </S.UserList>
    </S.UserListLayout>
  );
}
