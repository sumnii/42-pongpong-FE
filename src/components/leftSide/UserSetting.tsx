import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { activate2fa, get2faStatus, getOtpCode, inactivate2fa } from "api/2fa";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import { useOutsideClick } from "hooks/useOutsideClick";
import RecheckModal from "modal/RecheckModal";
import { getUsername } from "userAuth";
import * as S from "./style";

type PropType = {
  handleClose: (e: MouseEvent) => void;
};

export default function UserSetting({ handleClose }: PropType) {
  const { Modal, isOpen, onOpen, onClose } = useModal();
  const modalRef = useRef(null);
  function handleDoubleModalClose(e: MouseEvent) {
    if (!isOpen) handleClose(e);
  }
  useOutsideClick({ modalRef, onClose: handleDoubleModalClose });

  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneRegExp = /^[0-9]{0,13}$/;
  const [otpCode, setOtpCode, resetOtpCode] = useInput("");
  const otpAccessToken = useRef("");

  const [isToggleOn, setIsToggleOn] = useState(true);
  const [sended, setSended] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
  const [authResultMessage, setAuthResultMessage] = useState("");

  const statusOf2faQuery = useQuery({
    queryKey: ["2fa", getUsername()],
    queryFn: get2faStatus,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (statusOf2faQuery.isSuccess) {
      setIsToggleOn(statusOf2faQuery.data.status);
      setAuthenticated(statusOf2faQuery.data.status);
      if (statusOf2faQuery.data.status) setPhoneNumber(statusOf2faQuery.data.phonenumber);
    }
  }, [statusOf2faQuery.isSuccess]);

  function handleToggle() {
    if (isToggleOn) {
      authenticated ? onOpen() : setIsToggleOn(false);
    } else setIsToggleOn(true);
  }

  function handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (phoneRegExp.test(e.target.value)) {
      setPhoneNumberMessage("");
      setPhoneNumber(e.target.value);
    } else setPhoneNumberMessage("하이픈(-) 없이 숫자만 입력해 주세요.");
    if (sended) setSended(false);
    if (otpCode) resetOtpCode();
    if (authResultMessage) setAuthResultMessage("");
    if (authenticated) setAuthenticated(false);
  }

  function handleOtpCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (authResultMessage) setAuthResultMessage("");
    setOtpCode(e);
  }

  async function handleSend() {
    if (!phoneNumber) setPhoneNumberMessage("휴대폰 번호를 입력해 주세요.");
    else if (statusOf2faQuery && phoneNumber === statusOf2faQuery.data.phonenumber)
      setPhoneNumberMessage("변경된 휴대폰 번호를 입력해 주세요.");
    else {
      try {
        const res = await getOtpCode(phoneNumber);
        otpAccessToken.current = res.accessToken;
        setSended(true);
        setPhoneNumberMessage("인증번호를 보냈습니다");
      } catch (err) {
        if (err === "invalidPhoneNumber") setPhoneNumberMessage("휴대폰 번호를 확인해 주세요.");
        else if (err === "serverError") setPhoneNumberMessage("잠시 후에 다시 시도해주세요.");
      }
    }
  }

  async function twoFactorAuthOn() {
    if (!otpCode) setAuthResultMessage("인증 번호를 입력해 주세요.");
    else {
      try {
        await activate2fa({ token: otpAccessToken.current, otpCode });
        queryClient.refetchQueries(["2fa"]);
        setAuthenticated(true);
        setAuthResultMessage("2단계 인증이 설정되었습니다.");
      } catch (err) {
        if (err === "wrongOtpCode") setAuthResultMessage("인증 번호를 확인해 주세요.");
        else if (err === "serverError") setAuthResultMessage("잠시 후에 다시 시도해주세요.");
      }
    }
  }

  async function twoFactorAuthOff(setErrMsg: React.Dispatch<React.SetStateAction<string>>) {
    try {
      await inactivate2fa();
      queryClient.refetchQueries(["2fa"]);
      setIsToggleOn(false);
      setAuthenticated(false);
    } catch (err) {
      if (err === "serverError") setErrMsg("잠시 후에 다시 시도해주세요.");
    }
  }

  return (
    <>
      {isOpen && (
        <Modal>
          <RecheckModal onClose={onClose} handleState={twoFactorAuthOff} />
        </Modal>
      )}
      <S.SettingBox ref={modalRef}>
        <S.RowBox>
          <S.Title>2단계 인증 설정</S.Title>
          <S.ToggleWrapper onClick={handleToggle}>
            {isToggleOn ? <S.ToggleOnIcon /> : <S.ToggleOffIcon />}
          </S.ToggleWrapper>
        </S.RowBox>
        <S.AuthSection visible={isToggleOn}>
          <S.InputBox>
            <S.RowBox>
              <S.Input
                placeholder="휴대폰 번호"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                disabled={authenticated}
              ></S.Input>
              {authenticated ? (
                <S.SubmitButton
                  type="button"
                  onClick={() => {
                    setAuthenticated(false);
                  }}
                >
                  휴대폰번호 변경
                </S.SubmitButton>
              ) : (
                <S.SubmitButton type="button" onClick={handleSend} disabled={sended}>
                  인증번호 받기
                </S.SubmitButton>
              )}
            </S.RowBox>
            <S.Span color={phoneNumberMessage === "인증번호를 보냈습니다" ? "green" : "red"}>
              {phoneNumberMessage}
            </S.Span>
          </S.InputBox>
          <S.InputBox>
            <S.RowBox>
              <S.Input
                placeholder="인증 번호"
                value={otpCode}
                onChange={handleOtpCodeChange}
                disabled={authenticated || !sended}
              ></S.Input>
              <S.SubmitButton
                type="button"
                onClick={twoFactorAuthOn}
                disabled={authenticated || !sended}
              >
                인증
              </S.SubmitButton>
            </S.RowBox>
            <S.Span color={authResultMessage === "2단계 인증이 설정되었습니다." ? "green" : "red"}>
              {authResultMessage}
            </S.Span>
          </S.InputBox>
        </S.AuthSection>
      </S.SettingBox>
    </>
  );
}
