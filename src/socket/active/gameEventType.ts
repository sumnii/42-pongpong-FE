export type JoinExitResponse = {
  status: "error" | "approved";
  detail?: string;
  roomId: number;
};
