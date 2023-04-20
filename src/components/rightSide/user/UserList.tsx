import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "api/user";
import { getSocket } from "socket/socket";
import { ChatUserListType } from "socket/chat";
import { getUsername } from "userAuth";
import UserInfo from "./UserInfo";
import * as S from "../style";

export default function UserList(props: {
  listOf: "friend" | "dm" | "participant" | "banned" | "player" | "observer" | string;
  room?: number;
}) {
  const [chatUserList, setChatUserList] = useState<ChatUserListType | null>(null);
  const socket = getSocket();
  const [myOper, setMyOper] = useState("participant");

  const listener = (res: ChatUserListType) => {
    console.log("userList", res);
    if (res.type === "chatRoom" && res.roomId === props.room) {
      setChatUserList(res);
    }
  };

  useEffect(() => {
    socket.on("message", listener);
    const myRoomInfo = chatUserList?.userList.filter((user) => user.username === getUsername())[0];
    if (myRoomInfo?.owner) setMyOper("owner");
    if (myRoomInfo?.admin) setMyOper("admin");
    // TODO: 소켓 수정 전까지 테스트 필요
    console.log(myRoomInfo, myOper);

    return () => {
      socket.off("message", listener);
    };
  }, []);

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
                  userOper={user.owner ? "owner" : user.admin ? "admin" : ""}
                  subLine={user.login ? "🔵 온라인" : "⚫️ 오프라인"}
                  oper={myOper}
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
