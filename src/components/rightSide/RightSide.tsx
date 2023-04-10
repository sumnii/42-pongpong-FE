import MyProfileBtn from "./MyProfileBtn";
import UserList from "./UserList";

function UserLists(props: {
  inPageOf: "main" | "chat" | "game";
  setProfileUser: (userId: string) => void;
}) {
  switch (props.inPageOf) {
    case "main":
      return (
        <>
          <UserList listOf={"friend"} setProfileUser={props.setProfileUser} />
          <UserList listOf={"dm"} setProfileUser={props.setProfileUser} />
        </>
      );
    case "chat":
      return <UserList listOf={"participant"} setProfileUser={props.setProfileUser} />;
    case "game":
      return (
        <>
          <UserList listOf="player" setProfileUser={props.setProfileUser} />
          <UserList listOf="observer" setProfileUser={props.setProfileUser} />
        </>
      );
  }
}

export default function RightSide(props: {
  inPageOf: "main" | "chat" | "game";
  setProfileUser: (userId: string) => void;
}) {
  return (
    <>
      <MyProfileBtn setProfileUser={props.setProfileUser} />
      <UserLists inPageOf={props.inPageOf} setProfileUser={props.setProfileUser} />
    </>
  );
}
