import { useState } from "react";
import { useLocation } from "react-router-dom";
import MyProfile from "./MyProfile";
import FriendAndDmBar from "./FriendAndDmBar";
import OtherUserList from "./OtherUserList";
import { UserDropContext } from "hooks/context/UserDropContext";
import { RightSideLayout } from "./style";

export default function RightSide() {
  const [droppedUser, setDroppedUser] = useState("");
  const path = useLocation().pathname.split("/");
  let inPageOf = path[1];
  if (path[2] === undefined || path[2] === "list") inPageOf = "main";

  return (
    <RightSideLayout>
      <UserDropContext.Provider value={{ user: droppedUser, userSet: setDroppedUser }}>
        <MyProfile />
        <FriendAndDmBar />
        {inPageOf !== "main" && <OtherUserList page={inPageOf} />}
      </UserDropContext.Provider>
    </RightSideLayout>
  );
}
