import { useLocation } from "react-router-dom";
import { ChatUserListType } from "socket/chat";
import UserList from "./UserList";

export default function OtherUserList(props: {
  inPageOf: "main" | "chat" | "game";
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
          <UserList listOf={"friend"} />
          <UserList listOf={"dm"} />
        </>
      );
    case "chat":
      return (
        <>
          <UserList listOf={"participant"} chatUserList={props.chatUsers} />
          <UserList listOf={"banned"} chatUserList={props.chatUsers} />
        </>
      );
    case "game":
      return (
        <>
          <UserList listOf="player" />
          <UserList listOf="observer" />
        </>
      );
  }
}
