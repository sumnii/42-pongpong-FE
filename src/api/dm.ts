import axios from "axios";

export async function getDmList() {
  try {
    const res = await axios.get("/dm/list");
    return res.data;
  } catch (err: unknown) {
    console.error(err);
    return null;
  }
}
