import { useEffect, useRef, useState } from "react";
import { getSocket } from "socket/socket";
import * as S from "modal/layout/style";
import * as T from "socket/passive/friendDmListType";

export default function DmModal(props: { targetUser: string; onClose: () => void }) {
  const socket = getSocket();
  const [dmChat, setDmChat] = useState<T.DmData[]>([]);
  const modalRef: React.RefObject<HTMLDivElement> = useRef(null);
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
        <S.DmHeader>
          <S.DmTitle>{props.targetUser}님과의 다이렉트 메시지</S.DmTitle>
          <S.IconWrapper type="reset" onClick={props.onClose}>
            <S.CloseIcon />
          </S.IconWrapper>
        </S.DmHeader>
        <S.DmChatBox>
          {dmChat.map((chat) => {
            return (
              <li key={key++}>
                {chat.from} : {chat.content}
              </li>
            );
          })}
        </S.DmChatBox>
        <S.InputBox>
          <S.DmInput />
          <S.IconWrapper
            type="submit"
            onClick={(e) => {
              // TODO: DM 전송 구현
              e.preventDefault();
              alert("DM 전송!");
            }}
          >
            <S.SendBtn />
          </S.IconWrapper>
        </S.InputBox>
      </S.DmLayout>
    </>
  );
}
