import { useLocation } from "react-router-dom";
import { ChatUserListType } from "socket/chat";
import UserList from "./UserList";

export default function OtherUserList(props: { chatUsers: ChatUserListType | null }) {
  const path = useLocation().pathname;
  let page: "main" | "chat" | "game" = "main";
  let roomId: number;
  let match;

  if ((match = path.match(/\/$/)) || (match = path.match(/\/(game|chat)\/list/))) {
    page = "main";
  } else if ((match = path.match(/\/chat\/(\d+)/))) {
    page = "chat";
    roomId = Number(match[1]);
  } else if ((match = path.match(/\/game\/(\d+)/))) {
    page = "game";
    roomId = Number(match[1]);
  }

  switch (page) {
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
