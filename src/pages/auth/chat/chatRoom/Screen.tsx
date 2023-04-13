import { useEffect, useRef, useState } from "react";
import * as S from "./style";
import { ChatEvntType, onChat } from "ws/chat";

export default function Screen() {
  const [screen, setScreen] = useState<ChatEvntType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  let keyCnt = 0;

  useEffect(() => {
    onChat(screen, setScreen);
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [screen]);

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
