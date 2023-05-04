import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getSocket } from "socket/socket";
import { getUsername } from "userAuth";
import * as S from "./style";

export default function Screen() {
  const { gameId } = useParams();
  const socket = getSocket();
  const username = getUsername();
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
  const [camp, setCamp] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  const listener = (res: { type: string; status: any }) => {
    if (res.status.roomId !== Number(gameId)) return;
    if (res.type === "game") {
      if (roomId !== res.status.roomId) {
        setRoomId(res.status.roomId);
        console.log(res.status);
      }
      if (camp === "") {
        if (username === res.status.blueUser) setCamp("blue");
        else if (username === res.status.redUser) setCamp("red");
      }
      if (ballRadius === 0) setBallRadius(res.status.ballRadius);
      if (redWidth === 0) setRedWidth(res.status.redPaddleWidth);
      if (redHeight === 0) setRedHeight(res.status.redPaddleHeight);
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
        role: camp,
      });
    } else if (e.keyCode === 40) {
      socket.emit("down", {
        roomId: roomId,
        role: camp,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);
    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
    };
  }, [roomId, camp]);

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
      drawRedPaddle(redX, redY, redWidth, redHeight);
    }
  }, [ballX, ballY, redY, blueY]);

  useEffect(() => {
    socket.on("message", listener);
    return () => {
      socket.off("message", listener);
    };
  }, [roomId]);
  return <S.Canvas ref={canvasRef} width={540} height={360}></S.Canvas>;
}
