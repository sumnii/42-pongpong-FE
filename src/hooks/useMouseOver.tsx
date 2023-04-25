import { useEffect, useState } from "react";

type MouseOverProps = {
  listOf: string | undefined;
  user: string;
};

export default function useMouseOver({ listOf, user }: MouseOverProps) {
  if (listOf !== "dm") return { isMouseEnter: false, onLeave: null };

  const [isMouseEnter, setIsMouseEnter] = useState(false);

  function onEnter() {
    setIsMouseEnter(true);
  }

  function onLeave() {
    setIsMouseEnter(false);
  }

  useEffect(() => {
    const node = document.getElementById(user + "info");
    node?.addEventListener("mouseenter", onEnter);
    node?.addEventListener("mouseleave", onLeave);

    return () => {
      node?.removeEventListener("mouseenter", onEnter);
      node?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return { isMouseEnter, onLeave };
}
