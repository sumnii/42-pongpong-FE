import { useEffect } from "react";
import { getSocket } from "../socket/socket";
import { NavigateFunction } from "react-router-dom";

type Props = {
  type: string;
  navigate: NavigateFunction;
};

export default function useSubListener({ type, navigate }: Props) {
  const socket = getSocket();

  function subListener(res: { status: string; type: string; detail: string }) {
    if (res.status === "error" && res.type === type) {
      console.log(`${type} :`, res.detail);
      navigate("/404");
    }
  }

  useEffect(() => {
    socket.on("subscribeResult", subListener);
    return () => {
      socket.off("subscribeResult", subListener);
    };
  }, [type, navigate]);
}
