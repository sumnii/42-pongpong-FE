import MyProfile from "./MyProfile";
import OtherUserList from "./OtherUserList";

export default function RightSide(props: {
  inPageOf: "main" | "chat" | "game";
  setProfileUser: (userId: string) => void;
}) {
  return (
    <>
      <MyProfile setProfileUser={props.setProfileUser} />
      <OtherUserList inPageOf={props.inPageOf} setProfileUser={props.setProfileUser} />
    </>
  );
}
