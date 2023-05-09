import { useOutsideClick } from "hooks/useOutsideClick";
import * as S from "./layout/style";
import { useRef } from "react";

type RecheckProps = {
  onClose: (e: MouseEvent) => void;
  handleState: () => void;
};

export default function RecheckModal({ onClose, handleState }: RecheckProps) {
  const modalRef = useRef(null);
  useOutsideClick({ modalRef, onClose });

  function onSubmit(e: MouseEvent) {
    handleState();
    onClose(e);
  }

  function onCancel(e: MouseEvent) {
    onClose(e);
  }

  return (
    <S.ModalLayout ref={modalRef}>
      <S.Content>
        2단계 인증을
        <br />
        해제하시겠습니까?
      </S.Content>
      <S.ButtonBox>
        <S.Btn onClick={onCancel as unknown as React.MouseEventHandler<HTMLButtonElement>}>
          취소
        </S.Btn>
        <S.Btn onClick={onSubmit as unknown as React.MouseEventHandler<HTMLButtonElement>}>
          확인
        </S.Btn>
      </S.ButtonBox>
    </S.ModalLayout>
  );
}
