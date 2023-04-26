import { useQuery } from "@tanstack/react-query";
import { getProfile } from "api/user";
import { getUsername } from "userAuth";
import UserInfo from "./user/UserInfo";
import * as S from "./style";
import { getSocket } from "socket/socket";
import { useEffect } from "react";

export default function MyProfile() {
  const username = getUsername();
  const socket = getSocket();

  useEffect(() => {
    socket.emit("subscribe", {
      type: "chatInvitation",
    });
    return () => {
      socket.emit("unsubscribe", {
        type: "chatInvitation",
      });
    };
  }, []);
  
  const profileQuery = useQuery({
    queryKey: ["profile", username],
    queryFn: () => {
      return getProfile(username);
    },
  });

  if (profileQuery.isLoading) return <S.UserItem />;

  return (
    <S.MyProfileLayout>
      <S.UserItem>
        <UserInfo username={profileQuery?.data?.username} subLine="🟣 온라인" />
      </S.UserItem>
    </S.MyProfileLayout>
  );
}
