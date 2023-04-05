import { createContext, Dispatch } from "react";
import { AuthState, Action } from "./authReducer";

type AuthContextType = {
  authState: AuthState;
  authDispatch: Dispatch<Action>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
