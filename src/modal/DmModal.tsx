import { useEffect, useRef, useState } from "react";
import { getSocket } from "socket/socket";
import useInput from "hooks/useInput";
import { useOutsideClick } from "hooks/useOutsideClick";
import LoadingCircle from "components/LoadingCircle";
import * as S from "modal/layout/style";
import * as T from "socket/passive/friendDmListType";

type DmModalProps = {
  targetUser: string;
  onClose: (e: MouseEvent) => void;
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
      res.list.map((chat) => {
        setDmChat((prevChat) => [...prevChat, chat]);
      });
      setIsLoading(false);
    } else if (res.type === "dm") {
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
    socket.emit("subscribe", {
      type: "dm",
      username: targetUser,
    });
    socket.on("dmResult", (res) => {
      if (res.status !== "approved") console.log("DM error", res);
    });

    return () => {
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
        <S.IconWrapper onClick={onClose as unknown as React.MouseEventHandler<Element>}>
          <S.CloseIcon />
        </S.IconWrapper>
      </S.DmHeader>
      <S.DmChatList ref={listRef}>
        {isLoading ? (
          <LoadingCircle w={50} h={50} />
        ) : (
          dmChat.map((chat) => {
            if (chat.from === targetUser)
              return (
                <S.OpponentChat id={String(key)} key={key++}>
                  {chat.content}
                </S.OpponentChat>
              );
            return (
              <S.MyChat id={String(key)} key={key++}>
                {chat.content}
              </S.MyChat>
            );
          })
        )}
      </S.DmChatList>
      <S.InputBox onSubmit={onSend}>
        <S.DmInput disabled={isLoading} id="input" value={input} onChange={handler} />
        <S.IconWrapper>
          <S.SendBtn />
        </S.IconWrapper>
      </S.InputBox>
    </S.DmLayout>
  );
}
