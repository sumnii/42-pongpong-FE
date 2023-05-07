import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAvatar } from "api/user";
import { getSocket } from "socket/socket";
import { JoinExitResponse } from "socket/active/gameEventType";
import * as S from "./style";

type GameItemProps = {
  no: number;
  roomId: number;
  rule: string;
  p1: string;
  p2: string;
};

export default function GameItem({ no, roomId, rule, p1, p2 }: GameItemProps) {
  const navigate = useNavigate();
  const socket = getSocket();

  function joinGameRoomListener(res: JoinExitResponse) {
    if (res.roomId !== roomId) return;
    if (res.status === "approved") navigate(`/game/${roomId}`);
    else console.log(res.detail);
  }

  useEffect(() => {
    socket.on("joinGameRoomResult", joinGameRoomListener);
    return () => {
      socket.off("joinGameRoomResult", joinGameRoomListener);
    };
  }, []);

  function onJoinGameRoom() {
    socket.emit("joinGameRoom", { roomId: Number(roomId) });
  }

  const redAvatarQuery = useQuery({
    queryKey: ["avatar", `${p1}`],
    queryFn: () => {
      return getAvatar(p1);
    },
  });

  const blueAvatarQuery = useQuery({
    queryKey: ["avatar", `${p2}`],
    queryFn: () => {
      return getAvatar(p2);
    },
  });

  if (redAvatarQuery.isLoading || blueAvatarQuery.isLoading) return <></>;
  if (redAvatarQuery.isError) console.log(redAvatarQuery.error);
  if (blueAvatarQuery.isError) console.log(blueAvatarQuery.error);

  return (
    <S.GameItem>
      <S.GameHeaderBox>
        <S.No>{no}</S.No>
        <S.Rule>🚩 {rule}</S.Rule>
        <S.EntryBtn onClick={onJoinGameRoom}>관전</S.EntryBtn>
      </S.GameHeaderBox>
      <S.PlayersBox>
        <S.PlayerBox>
          <S.PlayerAvatar red src={redAvatarQuery.data as unknown as string} />
          <S.PlayerName>{p1}</S.PlayerName>
        </S.PlayerBox>
        <S.Versus>vs</S.Versus>
        <S.PlayerBox>
          <S.PlayerAvatar blue src={blueAvatarQuery.data as unknown as string} />
          <S.PlayerName>{p2}</S.PlayerName>
        </S.PlayerBox>
      </S.PlayersBox>
    </S.GameItem>
  );
}
