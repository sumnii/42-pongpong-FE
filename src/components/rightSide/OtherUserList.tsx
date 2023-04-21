import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserListContext } from "hooks/context/UserListContext";
import UserList from "./user/UserList";

export default function OtherUserList() {
  const path = useLocation().pathname.split("/");
  const page = path[1];
  const roomId = path[2];
  if (roomId === undefined || roomId === "list") return null;
  const userListSet = useContext(UserListContext);

  switch (page) {
    case "chat":
      return (
        <>
          <UserList listOf={"participant"} list={userListSet && userListSet.participant} />
          {/* TODO: 방장과 admin인지 확인 후 노출 */}
          <UserList listOf={"banned"} list={userListSet && userListSet.banned} />
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
