import { useContext } from "react";
import { ChatUserListSet, GameUserListSet, UserListContext } from "hooks/context/UserListContext";
import UserList from "./user/UserList";

export default function OtherUserList(props: { page: string }) {
  const userListSet = useContext(UserListContext);
  const myOper = (userListSet as ChatUserListSet)?.myOper;

  switch (props.page) {
    case "chat":
      return (
        <>
          <UserList listOf={"participant"} list={(userListSet as ChatUserListSet).participant} />
          {myOper !== "participant" && (
            <UserList listOf={"banned"} list={(userListSet as ChatUserListSet).banned} />
          )}
        </>
      );
    case "game":
      return (
        <>
          <UserList listOf="player" list={(userListSet as GameUserListSet).players} />
          <UserList listOf="spectator" list={(userListSet as GameUserListSet).spectators} />
        </>
      );
    default:
      return null;
  }
}
