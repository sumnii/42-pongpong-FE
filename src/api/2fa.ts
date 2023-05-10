import axios, { AxiosError } from "axios";

export async function get2faStatus() {
  const res = await axios.get("/user/is2fa");
  return res.data;
}

export async function getOtpCode(phoneNumber: string) {
  try {
    const res = await axios.post("/auth/activate/2fa", {
      phonenumber: phoneNumber,
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) throw "invalidPhoneNumber";
      else throw "serverError";
    }
  }
}

type activaate2faProps = {
  token: string;
  otpCode: string;
};

export async function activate2fa({ token, otpCode }: activaate2faProps) {
  try {
    const res = await axios.post(
      "/auth/check/otp",
      {
        otp: otpCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) throw "wrongOtpCode";
      else throw "serverError";
    }
  }
}

export async function inactivate2fa() {
  try {
    const res = await axios.get("/auth/inactivate/2fa");
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 403) throw "serverError";
    }
  }
}
