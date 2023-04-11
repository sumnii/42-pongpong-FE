import { useEffect, useState } from "react";
import { getSocket } from "socket/socket";

interface dataType {
  status: "plain" | "notice"
  from: string
  content: string
}

export default function ChatScreen() {
  const [screen, setScreen] = useState<dataType[]>([]);

  let keyCnt = 0;
  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on('chat', data => {
        const res: dataType = data;
        const arr: dataType[] = [...screen, res];
        setScreen(arr);
        console.log(data);
      })
    }
  }, [screen]);

  return (
    <>
      <h3> 여기 </h3>
      <ul>
        {screen.map((i: dataType) => {
          return (
            <>
              <h1 key={i.from + (keyCnt++)}>
                {i.from}  : {i.content}
              </h1>
            </>
          );
        })}
      </ul>
    </>
  );
}