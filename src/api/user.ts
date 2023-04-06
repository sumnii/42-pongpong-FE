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
