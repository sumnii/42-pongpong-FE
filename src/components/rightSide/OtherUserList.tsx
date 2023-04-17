import { useLocation } from "react-router-dom";
import UserList from "./user/UserList";

export default function OtherUserList() {
  const path = useLocation().pathname;
  const split = path.split("/");
  let page = split[1];
  const roomId = split[2];
  if (roomId === undefined || roomId === "list") page = "main";

  switch (page) {
    case "main":
      return (
        <>
          {/* <UserList listOf={"friend"} /> */}
          {/* <UserList listOf={"dm"} /> */}
        </>
      );
    case "chat":
      return (
        <>
          <UserList listOf={"participant"} />
          {/* TODO: 방장과 admin인지 확인 후 노출 */}
          <UserList listOf={"banned"} />
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
