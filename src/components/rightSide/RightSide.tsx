import { ChatUserListType } from "socket/chat";
import MyProfile from "./MyProfile";
import OtherUserList from "./OtherUserList";

export default function RightSide(props: { userList: ChatUserListType | null }) {
  return (
    <>
      <MyProfile />
      <OtherUserList chatUsers={props.userList} />
    </>
  );
}
