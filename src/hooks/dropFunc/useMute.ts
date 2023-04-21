import { useEffect, useState } from "react";
import { getSocket } from "socket/socket";
import { ChatRoomResponse } from "socket/active/chatEventType";

export default function useMute(
  roomId: number,
  targetUser: string,
  targetMuted: boolean | undefined,
  onClose: () => void,
) {
  const [isMuted, setIsMuted] = useState(targetMuted);
  const socket = getSocket();

  function onMute() {
    socket.emit("mute", { roomId, username: targetUser });
    setIsMuted(true);
  }

  function handleResult(res: ChatRoomResponse) {
    if (res.status === "approved") {
      console.log("뮤트 승인", res);
      onClose();
    } else console.log("뮤트 에러", res);
  }

  useEffect(() => {
    socket.on("muteResult", handleResult);
  }, []);

  return { isMuted, onMute };
}
