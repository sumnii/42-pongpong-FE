import React from "react";
import UserList from "./userList/UserList";

export default function RightSide(props: {
  inPageOf: "main" | "chat" | "game",
}) {
  switch (props.inPageOf) {
    case "main":
      return (
        <>
          <UserList listOf={"friend"} />
          <UserList listOf={"dm"} />
        </>
      );
    case "chat":
      return <UserList listOf={"participant"} />;
    case "game":
      return (
        <>
          <UserList listOf="player" />
          <UserList listOf="observer" />
        </>
      );
  }
}
