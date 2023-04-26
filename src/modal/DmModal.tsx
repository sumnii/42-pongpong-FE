import { useEffect, useRef, useState } from "react";
import { getSocket } from "socket/socket";
import useInput from "hooks/useInput";
import * as S from "modal/layout/style";
import * as T from "socket/passive/friendDmListType";
import { useOutsideClick } from "hooks/useOutsideClick";

type DmModalProps = {
  targetUser: string;
  onClose: () => void;
};

export default function DmModal({ targetUser, onClose }: DmModalProps) {
  const socket = getSocket();
  const [dmChat, setDmChat] = useState<T.DmData[]>([]);
  const modalRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [input, handler, reset] = useInput("");
  const listRef: React.RefObject<HTMLUListElement> = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  let key = 0;
  useOutsideClick({ modalRef, onClose });

  function listener(res: T.DmHistoryData | T.DmResponse) {
    if (res.type === "history" && dmChat.length === 0) {
      // TEST: DM 구현중
      console.log("dm 히스토리", res);
      res.list.map((chat) => {
        setDmChat((prevChat) => [...prevChat, chat]);
      });
      setIsLoading(false);
    } else if (res.type === "dm") {
      console.log("dm", res);
      setDmChat((prevChat) => [...prevChat, { from: res.from, content: res.content }]);
    }
  }

  function onSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.length === 0) return;
    socket.emit("dm", {
      username: targetUser,
      content: input,
    });
    reset();
  }

  useEffect(() => {
    document.getElementById(String(key - 1))?.scrollIntoView();
    document.getElementById("input")?.focus();
  }, [dmChat]);

  useEffect(() => {
    document.getElementById("input")?.focus();
  }, [isLoading]);

  useEffect(() => {
    console.log("마운트");
    socket.emit("subscribe", {
      type: "dm",
      username: targetUser,
    });
    socket.on("dmResult", (res) => {
      console.log("dm 전송 결과", res);
      // TEST: DM 전송에서 발생할 에러 핸들링
      if (res.status !== "approved") console.log("DM 오류", res);
    });

    return () => {
      console.log("언마운트");
      socket.emit("unsubscribe", {
        type: "dm",
        username: targetUser,
      });
      socket.off("dmResult");
    };
  }, []);

  useEffect(() => {
    socket.on("message", listener);
    return () => {
      socket.off("message", listener);
    };
  }, []);

  return (
    <S.DmLayout ref={modalRef}>
      <S.DmHeader>
        <S.DmTitle>{targetUser}님과의 다이렉트 메시지</S.DmTitle>
        <S.IconWrapper type="reset" onClick={onClose}>
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
        <S.DmInput disabled={isLoading} id="input" value={input} onChange={handler} />
        <S.IconWrapper type="submit">
          <S.SendBtn />
        </S.IconWrapper>
      </S.InputBox>
    </S.DmLayout>
  );
}
