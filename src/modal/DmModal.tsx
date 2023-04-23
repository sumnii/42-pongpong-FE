import { SetStateAction, useEffect, useRef, useState } from "react";
import { getSocket } from "socket/socket";
import * as S from "modal/layout/style";
import * as T from "socket/passive/friendDmListType";

export default function DmModal(props: {
  targetUser: string;
  onClose: React.Dispatch<SetStateAction<boolean>>;
}) {
  const socket = getSocket();
  const [dmChat, setDmChat] = useState<T.DmData[]>([]);
  const modalRef: React.RefObject<HTMLDivElement> = useRef(null);
  let key = 0;

  function handleClose(e: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Element)) props.onClose(false);
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClose);
    return () => {
      window.removeEventListener("mousedown", handleClose);
    };
  });

  function listener(res: T.DmHistoryData | T.DmResult) {
    if (res.type === "history" && dmChat.length === 0) {
      res.list.map((chat) => {
        setDmChat((prevChat) => [...prevChat, chat]);
      });
    } else if (res.type === "dm") {
      setDmChat((prevChat) => [...prevChat, { from: res.from, content: res.content }]);
    }
  }

  useEffect(() => {
    socket.on("message", listener);
    return () => {
      socket.off("message", listener);
    };
  });

  useEffect(() => {
    socket.emit("subscribe", {
      type: "dm",
      username: props.targetUser,
    });
    return () => {
      socket.emit("unsubscribe", {
        type: "dm",
        username: props.targetUser,
      });
    };
  }, []);

  return (
    <>
      <S.DmModalOverlay />
      <S.DmLayout ref={modalRef}>
        <S.DmChatBox>
          {dmChat.map((chat) => {
            return (
              <li key={key++}>
                {chat.from} : {chat.content}
              </li>
            );
          })}
        </S.DmChatBox>
        {/* TODO: 입력창 만들기 / DM 전송 */}
      </S.DmLayout>
    </>
  );
}
