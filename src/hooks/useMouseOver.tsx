import { useEffect, useState } from "react";

type MouseOverProps = {
  listOf: string | undefined;
  node: HTMLElement | null;
};

export default function useMouseOver({ listOf, node }: MouseOverProps) {
  if (listOf !== "dm") return { isMouseEnter: false, onLeave: null };

  const [isMouseEnter, setIsMouseEnter] = useState(false);

  function onEnter() {
    setIsMouseEnter(true);
  }

  function onLeave() {
    setIsMouseEnter(false);
  }

  useEffect(() => {
    node?.addEventListener("mouseenter", onEnter);
    node?.addEventListener("mouseleave", onLeave);

    return () => {
      node?.removeEventListener("mouseenter", onEnter);
      node?.removeEventListener("mouseleave", onLeave);
    };
  }, [node]);

  return { isMouseEnter, onLeave };
}
