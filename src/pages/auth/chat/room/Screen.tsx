import { useEffect, useRef, useState } from "react";
import { ChatData } from "socket/passive/chatRoomType";
import { getSocket } from "socket/socket";
import * as S from "./style";

export default function Screen(props: { room: number }) {
  const socket = getSocket();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState<ChatData[]>([]);
  let keyCnt = 0;

  function listener(res: ChatData) {
    if (res.roomId !== Number(props.room)) return;
    if (res.type === "chat") {
      setScreen((prevScreen) => [...prevScreen, res])
    } else if (res.type === "history") {
      const historyChat: ChatData[] = [];
      res.list?.map((chat) => {
        historyChat.push({ ...chat, type: "chat", roomId: props.room });
      });
      setScreen(historyChat);
    }
  }

  useEffect(() => {
    socket.on("message", listener);
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);

    return () => {
      socket.off("message", listener);
    };
  });

  return (
    <>
      <S.Screen ref={scrollRef}>
        {screen?.map((chat: ChatData) => {
          return (
            <S.H2 key={chat.from + keyCnt++}>
              {chat.from === "server" ? "📣 " : `${chat.from} : `}
              {chat.content}
            </S.H2>
          );
        })}
      </S.Screen>
    </>
  );
}
