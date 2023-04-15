import { useLocation } from "react-router-dom";
import { ChatUserListType } from "socket/chat";
import UserList from "./UserList";

export default function OtherUserList(props: {
  inPageOf: "main" | "chat" | "game";
  setProfileUser: (userId: string) => void;
  chatUsers: ChatUserListType | null;
}) {
  const path = useLocation().pathname;
  let match;
  let roomId: number;
  if (props.inPageOf !== "main") match = path.match(/\/\w+\/(\d+)/);
  if (match && match !== undefined) roomId = Number(match[1]);

  switch (props.inPageOf) {
    case "main":
      return (
        <>
          <UserList listOf={"friend"} setProfileUser={props.setProfileUser} />
          <UserList listOf={"dm"} setProfileUser={props.setProfileUser} />
        </>
      );
    case "chat":
      return (
        <>
          <UserList
            listOf={"participant"}
            setProfileUser={props.setProfileUser}
            chatUserList={props.chatUsers}
          />
          <UserList
            listOf={"banned"}
            setProfileUser={props.setProfileUser}
            chatUserList={props.chatUsers}
          />
        </>
      );
    case "game":
      return (
        <>
          <UserList listOf="player" setProfileUser={props.setProfileUser} />
          <UserList listOf="observer" setProfileUser={props.setProfileUser} />
        </>
      );
  }
}
