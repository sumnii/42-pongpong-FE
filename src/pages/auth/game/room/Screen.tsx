import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getSocket } from "socket/socket";
import { getUsername } from "userAuth";
import * as S from "./style";
import { useQueryClient } from "@tanstack/react-query";

type PropsType = {
  result: string;
  setResult: Dispatch<SetStateAction<string>>;
}

export default function Screen(props: PropsType) {
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
  const [score, setScore] = useState<{ blue: number; red: number }>({ blue: 0, red: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  const queryClient = useQueryClient();

  const listener = (res: { type: string; roomId?: number; status: any }) => {
    if (res.type === "game") {
      if (res.status.roomId !== Number(gameId)) return;
      if (roomId !== res.status.roomId) setRoomId(res.status.roomId);
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
      if (score.blue !== res.status.blueScore || score.red !== res.status.redScore) {
        setScore({
          red: res.status.redScore,
          blue: res.status.blueScore,
        });
      }
    } else if (res.type === "win") {
      if (res.roomId !== Number(gameId)) return;
      if (score.blue === 5) {
        props.setResult("blue 승리");
      } else if (score.red === 5) {
        props.setResult("red 승리");
      }else {
        props.setResult("상대방이 나갔습니다")
      }
    } else if (res.type === "lose") {
      if (res.roomId !== Number(gameId)) return;
      props.setResult("패배");
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    socket.on("message", listener);
    return () => {
      socket.off("message", listener);
      props.setResult("");
    };
  }, [roomId, score, gameId]);

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

  function drawResult() {
    if (ctx && canvas && props.result) {
      const result = props.result.split(" ")[1];
      ctx.font = "35px Arial";
      ctx.textAlign = "center";
      if (result === "승리") ctx.fillStyle = "#0095DD";
      else if (props.result === "패배") ctx.fillStyle = "#FF0088";
      ctx.fillText(props.result, canvas.width / 2, canvas.height / 3);
    }
  }

  function drawScore() {
    if (ctx && canvas) {
      ctx.font = "25px Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.fillText(`${score.red} : ${score.blue}`, canvas.width / 2, canvas.height / 10);
    }
  }

  useEffect(() => {
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //clear
      drawBall(ballX, ballY, ballRadius);
      drawBluePaddle(blueX, blueY, blueWidth, blueHeight);
      drawRedPaddle(redX, redY, redWidth, redHeight);
      drawScore();
      drawResult();
    }
  }, [ballX, ballY, redY, blueY, props.result]);

  return <S.Canvas ref={canvasRef} width={540} height={360}></S.Canvas>;
}
