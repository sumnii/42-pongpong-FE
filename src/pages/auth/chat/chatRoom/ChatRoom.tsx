import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import { Dispatch, SetStateAction, useEffect } from "react";
import * as S from "./style";
import Send from "./Send";
import Screen from "./Screen";
import Exit from "./Exit";

type PropsType = {
  setPage: (page: "chat") => void;
  setRoom: Dispatch<SetStateAction<number>>
};

export default function ChatRoom(props: PropsType) {
  const { roomId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) navigate("/");
    props.setPage("chat");
  });
  useEffect(() => {
    props.setRoom(Number(roomId));
  }, [])

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>{roomId}번 채팅방 입장완료</S.H2>
        <Exit room={Number(roomId)} />
      </S.HeaderBox>
      <S.MainBox>
        <Screen room={Number(roomId)}/>
        <Send room={Number(roomId)} />
      </S.MainBox>
    </S.PageLayout>
  );
}
