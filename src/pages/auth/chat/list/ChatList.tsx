import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatListArray, ChatRoomListData } from "socket/passive/chatRoomListType";
import { isAuth } from "userAuth";
import { getSocket } from "socket/socket";
import AvailableList from "./available/AvailableList";
import JoinedList from "./joined/JoinedList";
import RightSide from "@rightSide/RightSide";
import * as S from "./style";

export default function ChatList() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<ChatListArray>([]);
  const [myChatList, setMyChatList] = useState<ChatListArray>([]);
  const socket = getSocket();
  if (!isAuth()) navigate("/");

  const chatRoomListListener = (res: ChatRoomListData) => {
    if (res.type === "otherRoom") {
      const tmp: ChatListArray = [];
      res.list.map((elem) => {
        if (elem.status !== "private") {
          tmp.push(elem);
        }
      });
      setChatList(tmp);
    } else if (res.type === "myRoom") {
      setMyChatList(res.list);
    }
  };

  useEffect(() => {
    socket.emit("subscribe", {
      type: "chatRoomList",
    });

    return () => {
      socket.emit("unsubscribe", {
        type: "chatRoomList",
      });
    };
  }, []);

  useEffect(() => {
    socket.on("message", chatRoomListListener);
    return () => {
      socket.off("message", chatRoomListListener);
    };
  }, []);

  return (
    <>
      <S.PageLayout>
        <AvailableList chatList={chatList} />
        <hr />
        <JoinedList myChatList={myChatList} />
      </S.PageLayout>
      <RightSide />
    </>
  );
}
