import { useEffect, useRef, useState } from "react";
import { getSocket } from "socket/socket";
import * as S from './style';

interface dataType {
  status: "plain" | "notice"
  from: string
  content: string
}

export default function Screen() {
  const [screen, setScreen] = useState<dataType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  let keyCnt = 0;

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on('chat', data => {
        const res: dataType = data;
        const arr: dataType[] = [...screen, res];
        setScreen(arr);
      })
    }
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [screen]);

  return (
    <>
      <S.Screen ref={scrollRef}>
        {screen.map((i: dataType) => {
          return (
            <S.H2 key={i.from + (keyCnt++)}>
              {i.from} : {i.content}
            </S.H2>
          );
        })}
      </S.Screen>
    </>
  );
}