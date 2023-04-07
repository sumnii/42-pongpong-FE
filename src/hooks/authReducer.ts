export interface AuthState {
  isSignIn: boolean;
  username?: string;
  token?: string;
}

export interface Action {
  type: "signIn" | "signOut" | "getToken";
  username?: string;
  token?: string;
}

export default function authReducer(authState: AuthState, action: Action) {
  switch (action.type) {
    case "signIn":
      return {
        isSignIn: true,
        username: action.username,
        token: action.token,
      };
    case "signOut":
      return {
        isSignIn: false,
      };
    case "getToken":
      return {
        isSignIn: false,
        token: action.token,
      };
  }
}
