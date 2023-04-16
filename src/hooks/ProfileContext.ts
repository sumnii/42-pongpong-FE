import { createContext } from "react";

type setProfileUser = React.Dispatch<React.SetStateAction<string>>;

export const ProfileContext = createContext<setProfileUser | null>(null);
