import { createContext } from "react";

type droppedState = {
  user: string;
  userSet: React.Dispatch<React.SetStateAction<string>>;
};

export const UserDropContext = createContext<droppedState | null>(null);
