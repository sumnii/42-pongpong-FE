import { ChatUserListType } from "socket/chat";
import MyProfile from "./MyProfile";
import OtherUserList from "./OtherUserList";

export default function RightSide(props: {
  inPageOf: "main" | "chat" | "game";
  userList: ChatUserListType | null;
}) {
  return (
    <>
      <MyProfile />
      <OtherUserList inPageOf={props.inPageOf} chatUsers={props.userList} />
    </>
  );
}
