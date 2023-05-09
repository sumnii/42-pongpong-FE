import { useOutsideClick } from "hooks/useOutsideClick";
import { useRef, useState } from "react"
import * as S from "./style";

type PropType = {
  onClose: (e: MouseEvent) => void
}

export default function UserSetting({onClose}: PropType) {
  const modalRef = useRef(null);
  useOutsideClick({modalRef, onClose});
  // TODO: api 결과 받아오기
  const [isSetOn, setIsSetOn] = useState(false);

  return (<S.SettingBox ref={modalRef}>
    <S.Title>2단계 인증 설정</S.Title>
    <S.ToggleBox onClick={() => {setIsSetOn(!isSetOn)}}>
    {isSetOn ? <S.ToggleOnIcon /> : <S.ToggleOffIcon />}
    </S.ToggleBox>
  </S.SettingBox>)
}