import axios, { AxiosError } from "axios";

export async function getProfile(username: string) {
  try {
    const res = await axios.get(`/user/profile/${username}`);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response) {
      console.error(err.response);
      return null;
    }
  }
}

export type userInfoType = {
  username: string;
  password: string;
  phonenumber: string;
};

export async function create(userInfo: userInfoType) {
  try {
    const res = await axios.post(`/user/create`, {
      username: userInfo.username,
      password: userInfo.password,
      phonenumber: userInfo.phonenumber,
    });
    return res;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response) {
      console.error(err.response);
      return err.response;
    }
  }
}

