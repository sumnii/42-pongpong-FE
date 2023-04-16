import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import { Dispatch, SetStateAction, useEffect } from "react";
import * as S from "./style";
import Screen from "./Screen";
import ExitBtn from "./ExitBtn";
import SendBtn from "./SendBtn";

type PropsType = {
  setPage: (page: "chat") => void;
};

export default function ChatRoom(props: PropsType) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) navigate("/");
    props.setPage("chat");
  });

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>{roomId}번 채팅방 입장완료</S.H2>
        <ExitBtn room={Number(roomId)} />
      </S.HeaderBox>
      <S.MainBox>
        <Screen room={Number(roomId)}/>
        <SendBtn room={Number(roomId)} />
      </S.MainBox>
    </S.PageLayout>
  );
}
