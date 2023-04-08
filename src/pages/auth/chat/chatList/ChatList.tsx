import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import ChatItem from "./ChatItem";
import * as S from "./style";

export default function ChatList(props: { setPage: (page: "main") => void }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) navigate("/");
    props.setPage("main");
  });

  const chatInfo = [
    { id: 1, subject: "채팅방 1번", owner: "숨송", participantsCnt: 2 },
    { id: 2, subject: "채팅방 2번", owner: "아무개", participantsCnt: 4 },
  ];
  let roomCnt = 0;

  return (
    <S.PageLayout>
      <S.HeaderBox>
        <S.H2>참여 가능한 채팅방</S.H2>
      </S.HeaderBox>
      <S.ChatList>
        <S.ChatItem head>
          <ChatItem no={"No"} subject={"방제"} owner={"방장"} participantsCnt={"인원"} head />
        </S.ChatItem>
        {chatInfo.map((room) => {
          return (
            <S.ChatItem key={room.id}>
              <ChatItem
                no={(roomCnt += 1)}
                subject={room.subject}
                owner={room.owner}
                participantsCnt={room.participantsCnt}
              />
            </S.ChatItem>
          );
        })}
      </S.ChatList>
      <hr />
      <S.HeaderBox>
        <S.H2>참여중인 채팅방</S.H2>
      </S.HeaderBox>
      <S.ChatList>{/* 참여중 채팅방 구현 예정 */}</S.ChatList>
    </S.PageLayout>
  );
}
