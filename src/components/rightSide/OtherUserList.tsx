import UserList from "./UserList";

export default function OtherUserList(props: {
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
