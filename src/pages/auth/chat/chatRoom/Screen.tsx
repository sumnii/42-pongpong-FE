import { useEffect, useRef, useState } from "react";
import * as S from "./style";
import { ChatEvntType } from "socket/chat";
import { getSocket } from "socket/socket";

export default function Screen(props: { room: number }) {
  const [screen, setScreen] = useState<ChatEvntType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = getSocket();
  let keyCnt = 0;

  const listener = (res: ChatEvntType) => {
    console.log(res);
    if (res.roomId === props.room) {
      setScreen([...screen, res]);
    }
  }

  useEffect(() => {
    socket.on("chat", listener);
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    return () => {
      socket.off("chat", listener);
    }
  });

  return (
    <>
      <S.Screen ref={scrollRef}>
        {screen.map((i: ChatEvntType) => {
          return (
            <S.H2 key={i.from + keyCnt++}>
              {i.from} : {i.content}
            </S.H2>
          );
        })}
      </S.Screen>
    </>
  );
}
