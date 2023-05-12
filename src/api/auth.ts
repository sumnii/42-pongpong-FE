import axios, { AxiosError } from "axios";

export async function existUsername(username: string) {
  try {
    const res = await axios.get(`/auth/exist/${username}`);
    return res;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response) {
      console.error(err.response);
      return err.response;
    }
  }
}

export async function checkOtpLogin(OTP: string, token: string) {
  try {
    const res = await axios.post(
      `/auth/check/otp`,
      {
        otp: OTP,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response) {
      console.error(err.response);
      return err.response;
    }
  }
}

export async function login(code: string) {
  try {
    const res = await axios.get(`/auth/login/${code}`);
    return res;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response) {
      console.error(err.response);
      return err.response;
    }
  }
}