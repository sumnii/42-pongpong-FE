import axios from "axios";

export async function get2faStatus() {
  const res = await axios.get("/user/is2fa");
  return res.data;
}

export async function getOtpCode(phoneNumber: string) {
  const res = await axios.post("/auth/activate/2fa", {
    phonenumber: phoneNumber,
  });
  return res.data;
}

type activaate2faProps = {
  token: string;
  otpCode: string;
};

export async function activate2fa({ token, otpCode }: activaate2faProps) {
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
}

export async function inactivate2fa() {
  const res = await axios.get("/auth/inactivate/2fa");
  return res.data;
}
