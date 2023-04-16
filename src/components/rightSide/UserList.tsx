import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@api/user";
import * as S from "./style";
import { ChatUserListType, updateChatRoom } from "socket/chat";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSocket } from "socket/socket";

export default function UserList(props: {
  listOf: "friend" | "dm" | "participant" | "player" | "observer";
  setProfileUser: (userId: string) => void;
}) {
  let cnt = 0;
  const [dropMenu, setDropMenu] = useState(false);
  const [id, setId] = useState("");
  const userRef = useRef<HTMLLIElement>(null);
  const target = useLocation();
  const [chatUserList, setChatUserList] = useState<ChatUserListType | null>(null);
  const roomId = Number(target.pathname.split("/")[2]);
  const socket = getSocket();

  const listener = (res: ChatUserListType) => {
    console.log("updateChatRoom", res);
    if (res.roomId === roomId) {
      setChatUserList(res);
    }
  };

  useEffect(() => {
    // updateChatRoom(roomId, setChatUserList);
    socket.on("updateChatRoom", listener);
    return () => {
      socket.off("updateChatRoom", listener);
    };
  });

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

  const onDropMenuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setId(e.currentTarget.id);
    console.log(e);
    if (!dropMenu) setDropMenu(true);
    else setDropMenu(false);
  };
  return (
    <S.UserListLayout>
      <h3>{props.listOf}</h3>
      <S.UserList>
        {props.listOf === "participant" &&
          chatUserList?.userList.map((user) => {
            return (
              <S.UserItem key={cnt++} ref={userRef}>
                <S.TmpImg id={user.username} onClick={onDropMenuHandler} />
                <span>
                  {user.username}
                  <br />
                  {user.owner && "방장"}
                  {user.admin && "관리자"}
                </span>
                {dropMenu && user.username === id && <>hihi</>}
              </S.UserItem>
            );
          })}
        {props.listOf !== "participant" && (
          <S.UserItem key={1} onClick={() => props.setProfileUser(profileQuery?.data.username)}>
            <S.TmpImg />
            <span>
              {profileQuery?.data?.username}
              <br />
              {profileQuery?.data?.status === "login" ? "🔵 온라인" : "⚫️ 오프라인"}
            </span>
          </S.UserItem>
        )}
      </S.UserList>
    </S.UserListLayout>
  );
}
