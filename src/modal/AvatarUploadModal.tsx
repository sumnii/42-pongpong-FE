import { postAvatar } from "api/user";
import * as S from "./layout/style";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type modalProps = {
  username: string | undefined;
  prevUrl: string;
  close: () => void;
};

function AvatarUploadModal(props: modalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<FileList>();
  const [tmpImg, setTmpImg] = useState<string>("");
  const [noti, setNoti] = useState("");
  const queryCli = useQueryClient();

  const changeInput = () => {
    if (noti) setNoti("");
  };

  const onHandler = () => {
    let id;
    document.body.onfocus = () => (id = setTimeout(check, 400));
    clearTimeout(id);
  };

  const check = () => {
    const files = inputRef.current?.files;
    const dialog = document.getElementById("modal-dialog");
    dialog?.setAttribute("open", "");
    const reader = new FileReader();
    if (files) {
      setFileList(files);
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        if (reader.result) setTmpImg(reader.result as string);
      };
    }
    document.body.onfocus = null;
  };

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
    const formData = new FormData();
    if (fileList) {
      formData.append("avatar", fileList[0]);
      avatarMutation.mutate(formData);
    }
  };

  return (
    <S.AvatarUploadLayout>
      <form onSubmit={uploadAvatarHandler} encType="multipart/form-data">
        <h2>프로필 이미지 업로드</h2>
        <span> png / 20KB 이하 업로드 가능</span>
        <S.SelectImgWrapper>
          <S.Img src={tmpImg ? tmpImg : props.prevUrl} alt="프로필 이미지" />
          <S.Label htmlFor="avatar">프로필 이미지 선택</S.Label>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            accept=".png"
            id="avatar"
            onChange={changeInput}
            onClick={onHandler}
          />
        </S.SelectImgWrapper>
        <S.Span color="red">{noti}</S.Span>
        <S.BtnWrapper>
          <S.ModalButton type="submit"> 확인 </S.ModalButton>
          <S.ModalButton type="button" onClick={props.close}>
            취소
          </S.ModalButton>
        </S.BtnWrapper>
      </form>
    </S.AvatarUploadLayout>
  );
}

export default AvatarUploadModal;
