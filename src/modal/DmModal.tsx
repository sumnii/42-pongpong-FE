import { useEffect, useRef, useState } from "react";
import { getSocket } from "socket/socket";
import useInput from "hooks/useInput";
import * as S from "modal/layout/style";
import * as T from "socket/passive/friendDmListType";

export default function DmModal(props: { targetUser: string; onClose: () => void }) {
  const socket = getSocket();
  const [dmChat, setDmChat] = useState<T.DmData[]>([]);
  const modalRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [input, handler, reset] = useInput("");
  const listRef: React.RefObject<HTMLUListElement> = useRef(null);
  let key = 0;

  function handleClose(e: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Element)) props.onClose();
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClose);
    return () => {
      window.removeEventListener("mousedown", handleClose);
    };
  });

  function onSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.length === 0) return;
    socket.on("dmResult", (res) => {
      if (res.status === "approved") {
        reset();
      } else console.log("DM 오류", res);
      // TEST: DM 전송에서 발생할 에러 핸들링
    });
    socket.emit("dm", {
      username: props.targetUser,
      content: input,
    });
  }

  function listener(res: T.DmHistoryData | T.DmResponse) {
    if (res.type === "history" && dmChat.length === 0) {
      console.log("dm 히스토리", res);
      res.list.map((chat) => {
        setDmChat((prevChat) => [...prevChat, chat]);
      });
    } else if (res.type === "dm") {
      console.log("dm", res);
      setDmChat((prevChat) => [...prevChat, { from: res.from, content: res.content }]);
    }
  }

  useEffect(() => {
    document.getElementById(String(key - 1))?.scrollIntoView();
  }, [dmChat]);

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
    document.getElementById("input")?.focus();

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
        <S.DmHeader>
          <S.DmTitle>{props.targetUser}님과의 다이렉트 메시지</S.DmTitle>
          <S.IconWrapper type="reset" onClick={props.onClose}>
            <S.CloseIcon />
          </S.IconWrapper>
        </S.DmHeader>
        <S.DmChatList ref={listRef}>
          {dmChat.map((chat) => {
            return (
              <li id={String(key)} key={key++}>
                {chat.from} : {chat.content}
              </li>
            );
          })}
        </S.DmChatList>
        <S.InputBox onSubmit={onSend}>
          <S.DmInput id="input" value={input} onChange={handler} />
          <S.IconWrapper type="submit">
            <S.SendBtn />
          </S.IconWrapper>
        </S.InputBox>
      </S.DmLayout>
    </>
  );
}
