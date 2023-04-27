import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as S from "./layout/style";
import { useParams, useSearchParams } from "react-router-dom";
import { getSocket } from "socket/socket";

type modalProps = {
  close: () => void;
  notice: string;
  setNotice: Dispatch<SetStateAction<string>>;
};

export default function SettingPwModal(props: modalProps) {
  const [pwInput, setPwInput] = useState("");
  const [option, setOption] = useState("");
  const [target, setTarget] = useSearchParams();
  const { roomId } = useParams();
  const [disable, setDisable] = useState(true);
  const socket = getSocket();

  function setStatusHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setOption(e.target.value);
    if (pwInput) setPwInput("");
    if (props.notice) props.setNotice("");
    if (e.target.value === "change" || e.target.value === "set") setDisable(false);
    else setDisable(true);
  }

  function setPwHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPwInput(e.target.value);
  }

  function setHandler(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    if (option === "change") {
      if (pwInput) {
        socket.emit("changePassword", {
          roomId: Number(roomId),
          password: pwInput,
        });
      } else {
        props.setNotice("비밀번호를 입력해주세요.");
      }
    } else if (option === "set") {
      if (pwInput) {
        socket.emit("setPassword", {
          roomId: Number(roomId),
          password: pwInput,
        });
      } else {
        props.setNotice("비밀번호를 입력해주세요.");
      }
    } else if (option === "remove") {
      socket.emit("removePassword", {
        roomId: Number(roomId),
      });
    }
  }

  return (
    <S.SettingPwLayout>
      <h2>{target.get("title")} 채팅방 비밀번호 설정</h2>
      <form onSubmit={setHandler}>
        <select onChange={setStatusHandler}>
          <option value="opt">-- 옵션을 선택해주세요 --</option>
          <option value="change">비밀번호 변경</option>
          <option value="set">비밀번호 설정하기</option>
          <option value="remove">비밀번호 설정취소</option>
        </select>
        <S.Wrapper>
          <S.Input onChange={setPwHandler} value={pwInput} disabled={disable} />
        </S.Wrapper>
        <S.Span color="red">{props.notice}</S.Span>
        <S.BtnWrapper>
          <S.Button type="submit">확인</S.Button>
          <S.Button type="button" onClick={props.close}>취소</S.Button>
        </S.BtnWrapper>
      </form>
    </S.SettingPwLayout>
  );
}
