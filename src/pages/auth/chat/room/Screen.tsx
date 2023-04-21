import { useEffect, useRef } from "react";
import * as S from "./style";
import { ChatData } from "socket/passive/chatRoomType";

export default function Screen(props: { room: number; screen: ChatData[] | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  let keyCnt = 0;

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [props.screen]);

  return (
    <>
      <S.Screen ref={scrollRef}>
        {props.screen?.map((chat: ChatData) => {
          return (
            <S.H2 key={chat.from + keyCnt++}>
              {chat.from} : {chat.content}
            </S.H2>
          );
        })}
      </S.Screen>
    </>
  );
}
