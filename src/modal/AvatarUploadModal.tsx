import { postAvatar } from "api/user";
import * as S from "./layout/style";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { getSocket } from "socket/socket";

type modalProps = {
  close: () => void;
};

function AvatarUploadModal(props: modalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [noti, setNoti] = useState("");

  const changeInput = () => {
    if (noti) setNoti("");
  };

  const postAvatarHandler = async (form: FormData) => {
    const res = await postAvatar(form);
    if (res?.status === 201) {
      props.close();
    } else {
      setNoti(res?.data.message);
    }
    console.log(res);
  };

  const uploadAvatarHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = inputRef.current?.files;
    const formData = new FormData();
    if (files) {
      formData.append("avatar", files[0]);
      console.log(files);
      postAvatarHandler(formData);
    }
  };

  return (
    <S.AvatarUploadLayout>
      <form onSubmit={uploadAvatarHandler} encType="multipart/form-data">
        <h3>프로필 이미지 업로드</h3>
        <S.Span> png / 20KB 이하 업로드 가능</S.Span>
        <S.BtnWrapper>
          <input ref={inputRef} type="file" name="avatar" onChange={changeInput} />
        </S.BtnWrapper>
        <S.Span color="red">{noti}</S.Span>
        <S.BtnWrapper>
          <S.ModalButton2 type="submit"> 확인 </S.ModalButton2>
          <S.ModalButton2 type="button" onClick={props.close}>
            취소
          </S.ModalButton2>
        </S.BtnWrapper>
      </form>
    </S.AvatarUploadLayout>
  );
}

export default AvatarUploadModal;
