import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserListContext } from "hooks/context/UserListContext";
import { RoomIdContext } from "hooks/context/RoomIdContext";
import UserList from "./user/UserList";

export default function OtherUserList() {
  const path = useLocation().pathname.split("/");
  const page = path[1];
  const roomId = path[2];
  if (roomId === undefined || roomId === "list") return null;
  const userListSet = useContext(UserListContext);
  const myOper = useContext(UserListContext)?.myOper;

  switch (page) {
    case "chat":
      return (
        <RoomIdContext.Provider value={Number(roomId)}>
          <UserList listOf={"participant"} list={userListSet && userListSet.participant} />
          {myOper !== "participant" && (
            <UserList listOf={"banned"} list={userListSet && userListSet.banned} />
          )}
        </RoomIdContext.Provider>
      );
    case "game":
      return (
        <RoomIdContext.Provider value={Number(roomId)}>
          <UserList listOf="player" />
          <UserList listOf="observer" />
        </RoomIdContext.Provider>
      );
    default:
      return null;
  }
}
