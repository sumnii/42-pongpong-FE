import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import { Dispatch, SetStateAction, useEffect } from "react";
import * as S from "./style";
import Send from "./SendBtn";
import Screen from "./Screen";
import Exit from "./ExitBtn";

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
        <Exit room={Number(roomId)} />
      </S.HeaderBox>
      <S.MainBox>
        <Screen />
        <Send room={Number(roomId)} />
      </S.MainBox>
    </S.PageLayout>
  );
}
