import MyProfile from "./MyProfile";
import FriendAndDmBar from "./FriendAndDmBar";
import OtherUserList from "./OtherUserList";
import { useState } from "react";
import { UserDropContext } from "hooks/context/UserDropContext";
import { RightSideLayout } from "./style";

export default function RightSide() {
  const [droppedUser, setDroppedUser] = useState("");

  return (
    <RightSideLayout>
      <UserDropContext.Provider value={{ user: droppedUser, userSet: setDroppedUser }}>
        <MyProfile />
        <FriendAndDmBar />
        <OtherUserList />
      </UserDropContext.Provider>
    </RightSideLayout>
  );
}
