/*
 *          응답
 */

export type ChatRoomResponse = {
  status: "error" | "warning" | "approved";
  detail: string;
  roomId?: number;
};

/*
 *          요청
 */
