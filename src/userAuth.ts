import { setSocket } from "socket/socket";
import cookie from "react-cookies";

type Auth = {
  username: string;
  token: string;
};

let auth: Auth = {
  username: cookie.load("username"),
  token: cookie.load("token"),
};

export function setAuth(props: { username: string; token: string }) {
  auth = {
    username: props.username,
    token: props.token,
  };
  cookie.save("username", props.username, { path: "/" });
  cookie.save("token", props.token, { path: "/" });
  setSocket(props.token);
}

export function distroyAuth() {
  cookie.remove("username", { path: "/" });
  cookie.remove("token", { path: "/" });
}

export function setToken(newToken: string) {
  if (auth && auth.token) auth.token = newToken;
}

export function getAuth(): Auth {
  return auth;
}

export function getUsername(): string {
  if (auth && auth.username) return auth.username;
  throw Error("empty username");
}

export function getToken(): string {
  if (auth && auth.token) return auth.token;
  throw Error("empty token");
}

export function isAuth(): boolean {
  if (auth.username) return true;
  return false;
}
