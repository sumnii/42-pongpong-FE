import { useParams, useNavigate } from "react-router-dom";
import { isAuth } from "userAuth";
import * as S from "./style";
import RightSide from "@rightSide/RightSide";
import { getSocket } from "socket/socket";
import { useEffect, useRef, useState } from "react";

export default function GameRoom() {
  const navigate = useNavigate();
  if (!isAuth()) navigate("/");
  const { gameId } = useParams();
  if (Number.isNaN(Number(gameId))) navigate("/404");
  const socket = getSocket();
  const [roomId, setRoomId] = useState(0);
  const [ballX, setBallX] = useState(0);
  const [ballY, setBallY] = useState(0);
  const [ballRadius, setBallRadius] = useState(0);
  const [blueWidth, setBlueWidth] = useState(0);
  const [redWidth, setRedWidth] = useState(0);
  const [blueHeight, setBlueHeight] = useState(0);
  const [redHeight, setRedHeight] = useState(0);
  const [blueY, setBlueY] = useState(0);
  const [redY, setRedY] = useState(0);
  const [blueX, setBlueX] = useState(0);
  const [redX, setRedX] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  const listener = (res: { type: string; status: any }) => {
    if (res.status.roomId !== Number(gameId)) return;
    if (res.type === "game") {
      if (roomId !== res.status.roomId) setRoomId(res.status.roomId);
      if (ballRadius === 0) setBallRadius(res.status.ballRadius);
      if (redWidth === 0) setRedWidth(res.status.redPaddleWidth);
      if (redHeight === 0) setRedHeight(res.status.bluePaddleHeight);
      if (blueWidth === 0) setBlueWidth(res.status.bluePaddleWidth);
      if (blueHeight === 0) setBlueHeight(res.status.bluePaddleHeight);
      if (redX === 0) setRedX(res.status.redPaddleX);
      if (blueX === 0) setBlueX(res.status.bluePaddleX);
      setBallX(res.status.ballX);
      setBallY(res.status.ballY);
      setBlueY(res.status.bluePaddleY);
      setRedY(res.status.redPaddleY);
    } else {
      console.log(res);
    }
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 38) {
      socket.emit("up", {
        roomId: roomId,
        role: "red",
      });
    } else if (e.keyCode === 40) {
      socket.emit("down", {
        roomId: roomId,
        role: "red",
      });
    }
    if (e.keyCode === 87) {
      socket.emit("up", {
        roomId: roomId,
        role: "blue",
      });
    } else if (e.keyCode === 83) {
      socket.emit("down", {
        roomId: roomId,
        role: "blue",
      });
    }
  };

  const keyUpHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 38) {
      console.log(e.keyCode); // 방향키 위 : 38, 방향키 아래 : 40, 'w' : 87, 's': 83, esc : 27
    } else if (e.keyCode === 40) {
      console.log(e.keyCode);
    }
    if (e.keyCode === 87) {
      console.log(e.keyCode);
    } else if (e.keyCode === 83) {
      console.log(e.keyCode);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
    };
  }, [roomId]);

  const drawBall = (ballX: number, ballY: number, ballRadius: number) => {
    if (ctx) {
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.closePath();
    }
  };

  function drawBluePaddle(x: number, y: number, width: number, height: number) {
    if (ctx) {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }

  function drawRedPaddle(x: number, y: number, width: number, height: number) {
    if (ctx && canvas) {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = "#FF0088";
      ctx.fill();
      ctx.closePath();
    }
  }
  useEffect(() => {
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //clear
      drawBall(ballX, ballY, ballRadius);
      drawBluePaddle(blueX, blueY, blueWidth, blueHeight);
      drawRedPaddle(redX, redY, redWidth, blueHeight);
    }
  }, [ballX, ballY, redY, blueY]);

  useEffect(() => {
    socket.on("message", listener);
    socket.on("exitGameRoomResult", listener);
    //socket.emit("subscribe", {
    //  type: "gameRoom",
    //  roomId: roomId
    //});
    return () => {
      socket.off("message", listener);
      socket.off("exitGameRoomResult", listener);
      //socket.emit("unsubscribe", {
      //  type: "gameRoom",
      //  roomId: roomId
      //});
    };
  }, [roomId]);

  const exitGameHandler = () => {
    socket.emit("exitGameRoom", {
      roomId: roomId,
    });
  };

  return (
    <>
      <S.PageLayout>
        <S.HeaderBox>
          <S.H2>{gameId}번 게임방 접속 완료</S.H2>
        </S.HeaderBox>
        <button onClick={exitGameHandler}>나가기</button>
        <S.Canvas ref={canvasRef} width={540} height={360}></S.Canvas>
      </S.PageLayout>
      <RightSide />
    </>
  );
}
