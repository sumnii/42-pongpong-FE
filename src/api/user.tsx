import axios from "axios";

export async function getProfile(username: string) {
  try {
    const res = await axios.get(`/user/profile/${username}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
