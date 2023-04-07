export interface AuthState {
  isSignIn: boolean;
  username?: string;
  token?: string;
}

export interface Action {
  type: "signIn" | "signOut";
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
  }
}
