import { useEffect } from "react";

type OutSideClickProps = {
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: (e: MouseEvent) => void;
};

export function useOutsideClick({ modalRef, onClose }: OutSideClickProps) {
  function handleClose(e: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Element)) onClose(e);
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClose);
    return () => {
      window.removeEventListener("mousedown", handleClose);
    };
  }, []);
}
