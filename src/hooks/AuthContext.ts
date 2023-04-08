import { createContext } from "react";

type AuthContextType = React.Dispatch<React.SetStateAction<boolean>>;

export const AuthContext = createContext<AuthContextType | null>(null);
