import { useContext } from "react";
import { UserListContext } from "hooks/context/UserListContext";
import UserList from "./user/UserList";

export default function OtherUserList(props: { page: string }) {
  const userListSet = useContext(UserListContext);
  const myOper = useContext(UserListContext)?.myOper;

  switch (props.page) {
    case "chat":
      return (
        <>
          <UserList listOf={"participant"} list={userListSet && userListSet.participant} />
          {myOper !== "participant" && (
            <UserList listOf={"banned"} list={userListSet && userListSet.banned} />
          )}
        </>
      );
    case "game":
      return (
        <>
          <UserList listOf="player" />
          <UserList listOf="observer" />
        </>
      );
    default:
      return null;
  }
}
