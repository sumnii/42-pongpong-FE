import React, { SetStateAction, createContext } from "react";
import { NotiType } from "hooks/useNotiModal";

type NoticeState = {
  notiList: NotiType[];
  setNotiList: React.Dispatch<SetStateAction<NotiType[]>>;
}

export const NoticeListContext = createContext<NoticeState | null>(null);
