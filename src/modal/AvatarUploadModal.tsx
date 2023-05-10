import { postAvatar } from "api/user";
import * as S from "./layout/style";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type modalProps = {
  username: string | undefined;
  prevUrl: string;
  close: () => void;
};

function AvatarUploadModal(props: modalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [noti, setNoti] = useState("");
  const queryCli = useQueryClient();

  const changeInput = () => {
    if (noti) setNoti("");
  };

  const onHandler = () => {
    let id;
    document.body.onfocus = (() => id = setTimeout(check, 300));
    clearTimeout(id);
  }

  const check = () => {
    const length = inputRef.current?.files?.length;
    if (length !== undefined && length < 1) {
      props.close();
    }
    document.body.onfocus = null;
  }

  const avatarMutation = useMutation({
    mutationFn: (form: FormData) => {
      return postAvatar(form);
    },
    onSuccess: (res) => {
      if (res?.status === 201) {
        queryCli.invalidateQueries(["avatar", props.username]);
        URL.revokeObjectURL(props.prevUrl);
        props.close();
      } else {
        setNoti(res ? res.data.message : "");
      }
    },
  });

  const uploadAvatarHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = inputRef.current?.files;
    const formData = new FormData();
    if (files) {
      formData.append("avatar", files[0]);
      avatarMutation.mutate(formData);
    }
  };

  return (
    <S.AvatarUploadLayout>
      <form onSubmit={uploadAvatarHandler} encType="multipart/form-data">
        <h3>프로필 이미지 업로드</h3>
        <S.Span> png / 20KB 이하 업로드 가능</S.Span>
        <S.BtnWrapper>
          <input ref={inputRef} type="file" name="avatar" onChange={changeInput} onClick={onHandler}/>
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
