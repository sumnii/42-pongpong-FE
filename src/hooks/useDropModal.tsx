import { useCallback, useContext } from "react";
import { UserDropContext } from "hooks/context/UserDropContext";

export default function useDropModal(props: { listOf: string | undefined; username: string }) {
  const dropped = useContext(UserDropContext);
  let droppedUser = "";
  if (props.listOf) droppedUser = props.listOf + props.username;
  const dropIsOpen = dropped?.user !== "" && dropped?.user === droppedUser;

  const onDropClose = useCallback(() => {
    dropped?.userSet("");
  }, []);

  function onDropOpen() {
    dropped?.userSet(droppedUser);
  }

  return {
    onDropOpen,
    onDropClose,
    dropIsOpen,
  };
}
