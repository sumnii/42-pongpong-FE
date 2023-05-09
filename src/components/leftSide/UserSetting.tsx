import { useRef, useState } from "react";
import { useOutsideClick } from "hooks/useOutsideClick";
import * as S from "./style";

type PropType = {
  onClose: (e: MouseEvent) => void;
};

export default function UserSetting({ onClose }: PropType) {
  const modalRef = useRef(null);
  useOutsideClick({ modalRef, onClose });
  // TODO: api 결과에 따라 true/false 설정
  const [isToggleOn, setIsToggleOn] = useState(true);
  // TODO: api 결과에 따라 이미 등록되어있는 휴대폰번호 넣어주기
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const [sended, setSended] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
  const [authResultMessage, setAuthResultMessage] = useState("");

  const phoneRegExp = /^[0-9]{0,13}$/;

  function handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (phoneRegExp.test(e.target.value)) {
      setPhoneNumberMessage("");
      setPhoneNumber(e.target.value);
    } else setPhoneNumberMessage("하이픈(-) 없이 숫자만 입력해 주세요.");
    if (sended) setSended(false);
    if (otpCode) setOtpCode("");
    if (authResultMessage) setAuthResultMessage("");
    if (authenticated) setAuthenticated(false);
  }

  function handleOtpCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (authResultMessage) setAuthResultMessage("");
    setOtpCode(e.target.value);
  }

  function handleSend() {
    if (!phoneNumber) setPhoneNumberMessage("휴대폰 번호를 입력해 주세요.");
    else {
      // TODO: API 결과에 따라
      setSended(true);
      setPhoneNumberMessage("인증번호를 보냈습니다");
      // setPhoneNumberMessage("휴대폰 번호를 확인해 주세요.");
    }
  }

  function handleAuthenticate() {
    if (!otpCode) setAuthResultMessage("인증 번호를 입력해 주세요.");
    else {
      // TODO: API 결과에 따라
      setAuthenticated(true);
      setAuthResultMessage("2단계 인증이 설정되었습니다.");
      // setAuthResultMessage("인증 번호를 확인해 주세요.");
    }
  }

  return (
    <S.SettingBox ref={modalRef}>
      <S.RowBox>
        <S.Title>2단계 인증 설정</S.Title>
        <S.ToggleWrapper
          onClick={() => {
            setIsToggleOn(!isToggleOn);
          }}
        >
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
            ></S.Input>
            <S.SubmitButton type="button" onClick={handleSend} disabled={authenticated || sended}>
              인증번호 받기
            </S.SubmitButton>
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
              onClick={handleAuthenticate}
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
  );
}
