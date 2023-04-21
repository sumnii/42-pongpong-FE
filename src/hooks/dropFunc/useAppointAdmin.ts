import { useEffect } from "react";
import { getSocket } from "socket/socket";
import { ChatRoomResponse } from "socket/active/chatEventType";

export function useAppointAdmin(roomId: number, targetUser: string) {
  const socket = getSocket();

  function resultHandler(res: ChatRoomResponse) {
    if (res.status === "approved") {
      if (res.roomId === roomId) {
        // TEST : 부방장 이벤트 확인용
        console.log("부방장 지정 승인", res);
      }
    } else console.log(res);
  }

  useEffect(() => {
    socket.on("appointAdminResult", resultHandler);
    return () => {
      socket.off("appointAdminResult", resultHandler);
    };
  }, []);

  function onAppointAdmin() {
    // TEST: 부방장 지정 emit 폼 확인
    console.log("부방장지정 폼", roomId, targetUser);
    socket.emit("appointAdmin", {
      roomId,
      username: targetUser,
    });
  }

  return { onAppointAdmin };
}
