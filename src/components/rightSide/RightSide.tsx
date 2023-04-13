import { ChatUserListType } from "ws/chat";
import MyProfile from "./MyProfile";
import OtherUserList from "./OtherUserList";

export default function RightSide(props: {
  inPageOf: "main" | "chat" | "game";
  setProfileUser: (userId: string) => void;
  userList: ChatUserListType | null;
}) {
  return (
    <>
      <MyProfile setProfileUser={props.setProfileUser} />
      <OtherUserList inPageOf={props.inPageOf} setProfileUser={props.setProfileUser} chatUsers={props.userList}/>
    </>
  );
}
