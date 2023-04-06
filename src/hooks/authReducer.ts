export interface AuthState {
  isSignIn: boolean;
  username: string | null;
  token: string | null;
}

export type Action = { type: "signIn"; username: string; token: string } | { type: "signOut" };

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
        username: null,
        token: null,
      };
  }
}
