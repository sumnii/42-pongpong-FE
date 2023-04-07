import axios, { AxiosError } from "axios";

export async function getOtpSignUp(phoneNumber: string) {
  try {
    const res = await axios.post(`/auth/get/otp/signup`, {
      phonenumber: phoneNumber,
    });
    return res;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response) {
      console.error(err.response);
      return err.response;
    }
  }
}

export async function checkOtpSignUp(body: {phonenumber: string, otp: string}) {
  try {
    const res = await axios.post(`/auth/check/otp/signup`, {
      phonenumber: body.phonenumber,
      otp: body.otp,
    });
    return res;
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response) {
      console.error(err.response);
      return err.response;
    }
  }
}

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
