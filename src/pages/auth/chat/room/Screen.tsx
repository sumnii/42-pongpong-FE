import { useEffect, useRef, useState } from "react";
import { ChatData } from "socket/passive/chatRoomType";
import { getSocket } from "socket/socket";
import * as S from "./style";
import { getUsername } from "userAuth";

export default function Screen(props: { room: number }) {
  const socket = getSocket();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState<ChatData[]>([]);
  const me = getUsername();
  let keyCnt = 0;

  function listener(res: ChatData) {
    if (res.roomId !== Number(props.room)) return;
    if (res.type === "chat") {
      setScreen((prevScreen) => [...prevScreen, res]);
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
        <S.ChatList>
          {screen?.map((chat: ChatData) => {
            if (chat.from === "server")
              return <S.NoticeChat key={chat.from + keyCnt++}>📣 {chat.content}</S.NoticeChat>;
            if (chat.from === me)
              return <S.MyChat key={chat.from + keyCnt++}>{chat.content}</S.MyChat>;
            else
              return (
                <S.OpponentSet key={chat.from + keyCnt++}>
                  <S.OpponentFrom>{chat.from}</S.OpponentFrom>
                  <S.OpponentChat>{chat.content}</S.OpponentChat>
                </S.OpponentSet>
              );
          })}
        </S.ChatList>
      </S.Screen>
    </>
  );
}
