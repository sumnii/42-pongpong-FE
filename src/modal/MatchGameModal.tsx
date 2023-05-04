import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as S from "./layout/style";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSocket } from "socket/socket";

type modalProps = {
  close: () => void;
  notice: string;
  setNotice: Dispatch<SetStateAction<string>>;
};

export default function MatchGameModal(props: modalProps) {
  const [option, setOption] = useState("");
  const socket = getSocket();
  const navigate = useNavigate();

  function setStatusHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setOption(e.target.value);
    if (props.notice) props.setNotice("");
  }

  const listener = (res: any) => {
    console.log(res);
    props.setNotice("");
    if (res.status === "match") {
      navigate(`/game/${res.roomId}`);
    } else if (res.status === "searching") {
      props.setNotice("게임 찾는 중...");
    }
  };

  useEffect(() => {
    socket.on("searchGameResult", listener);
    return () => {
      socket.off("searchGameResult", listener);
    };
  });

  function setHandler(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    if (option) {
      socket.emit("searchGame", {
        rule: option,
      });
    } else {
      props.setNotice("옵션을 선택해주세요.");
    }
  }

  return (
    <S.MatchGameLayout>
      <h2>게임 매치 등록하기</h2>
      <form onSubmit={setHandler}>
        <S.Wrapper>
          <select onChange={setStatusHandler}>
            <option value="opt">-- 옵션을 선택해주세요 --</option>
            <option value="normal">일반 게임</option>
            <option value="rank">랭크 게임</option>
            <option value="arcade">특별 게임</option>
          </select>
        </S.Wrapper>
        <S.Span color="red">{props.notice}</S.Span>
        <S.Wrapper>
          <S.ModalButton2 type="submit">확인</S.ModalButton2>
          <S.ModalButton2 type="button" onClick={props.close}>
            취소
          </S.ModalButton2>
        </S.Wrapper>
      </form>
    </S.MatchGameLayout>
  );
}
