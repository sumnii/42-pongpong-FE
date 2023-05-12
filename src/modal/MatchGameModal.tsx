import { useEffect, useState } from "react";
import * as S from "./layout/style";
import { useNavigate } from "react-router-dom";
import { getSocket } from "socket/socket";
import LoadingCircle from "components/LoadingCircle";

type modalProps = {
  close: () => void;
};

export default function MatchGameModal(props: modalProps) {
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
    if (res.status === "match") {
      navigate(`/game/${res.roomId}`);
    } else if (res.status === "searching") {
      setNotice("게임 찾는 중...");
    } else if (res.status === "error") {
      alert(res.detail);
    } else {
      console.log(res);
    }
  };

  const cancelListener = (res: any) => {
    console.log(res);
    if (res.status === "approved") {
      props.close();
    }
  };

  useEffect(() => {
    socket.on("searchGameResult", listener);
    socket.on("cancleSearchResult", cancelListener);
    return () => {
      socket.off("searchGameResult", listener);
      socket.off("cancleSearchResult", cancelListener);
    };
  });

  function setHandler(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("searching");
    if (option) {
      socket.emit("searchGame", {
        rule: option,
      });
    } else {
      setNotice("옵션을 선택해주세요.");
      setStatus("");
    }
  }

  function cancelHandler() {
    console.log(option)
    if (status) {
      socket.emit("cancleSearch", {
        rule: option,
      })
    } else {
      props.close();
    }
  }

  return (
    <S.MatchGameLayout>
      <h2>게임 매치 등록하기</h2>
      <form onSubmit={setHandler}>
        <S.Wrapper>
          <select onChange={setStatusHandler} disabled={status === "searching"}>
            <option value="opt">-- 옵션을 선택해주세요 --</option>
            <option value="normal">일반 게임</option>
            <option value="rank">랭크 게임</option>
            <option value="arcade">특별 게임</option>
          </select>
        </S.Wrapper>
        <S.Wrapper>
          <S.SpanAbsolute color="red">{notice}</S.SpanAbsolute>
          {notice && status === "searching" && <LoadingCircle w={30} h={30} />}
        </S.Wrapper>
        <S.Wrapper>
          <S.ModalButton type="submit" disabled={status === "searching"}>확인</S.ModalButton>
          <S.ModalButton type="button" onClick={cancelHandler}>
            취소
          </S.ModalButton>
        </S.Wrapper>
      </form>
    </S.MatchGameLayout>
  );
}
