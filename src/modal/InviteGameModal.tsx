import { useEffect, useState } from "react";
import * as S from "./layout/style";
import { useNavigate } from "react-router-dom";
import { getSocket } from "socket/socket";
import LoadingCircle from "components/LoadingCircle";

type modalProps = {
  close: () => void;
  targetUser: string;
};

export default function InviteGameModal(props: modalProps) {
  const [option, setOption] = useState("");
  const [notice, setNotice] = useState("");
  const [status, setStatus] = useState("");
  const socket = getSocket();
  const navigate = useNavigate();

  function setStatusHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setOption(e.target.value);
    if (notice) setNotice("");
  }

  const listener = (res: any) => {
    console.log(res);

    setStatus(res.status);
    if (res.status === "error") {
      alert(res.detail);
    } else if (res.status === "warning") {
      setNotice(res.detail);
    }
    if (res.username !== props.targetUser) return;
    if (res.status === "waiting") {
      setNotice(`${res.username}님 수락 기다리는 중...`);
    } else if (res.status === "accept") {
      navigate(`/game/${res.roomId}`);
    } else if (res.status === "decline") {
      setNotice(`${res.username}님과의 게임이 성사되지 않았습니다.`);
    }
  };

  useEffect(() => {
    socket.on("inviteGameResult", listener);
    return () => {
      socket.off("inviteGameResult", listener);
    };
  });

  function setHandler(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice("");
    setStatus("waiting");
    if (option) {
      socket.emit("inviteGame", {
        username: props.targetUser,
        rule: option,
      });
    } else {
      setNotice("옵션을 선택해주세요.");
    }
  }

  return (
    <S.MatchGameLayout>
      <h2>{props.targetUser} 에게 게임 신청 하기</h2>
      <form onSubmit={setHandler}>
        <S.Wrapper>
          <select onChange={setStatusHandler} disabled={status === "waiting"}>
            <option value="opt">-- 옵션을 선택해주세요 --</option>
            <option value="normal">일반 게임</option>
            <option value="rank">랭크 게임</option>
            <option value="arcade">특별 게임</option>
          </select>
        </S.Wrapper>
        <S.Wrapper>
          <S.Span2 color="red">{notice}</S.Span2>
          {notice && status === "waiting" && <LoadingCircle w={30} h={30} />}
        </S.Wrapper>
        <S.Wrapper>
          <S.ModalButton2 type="submit" disabled={status === "waiting"}>
            확인
          </S.ModalButton2>
          <S.ModalButton2 type="button" disabled={status === "waiting"} onClick={props.close}>
            취소
          </S.ModalButton2>
        </S.Wrapper>
      </form>
    </S.MatchGameLayout>
  );
}
