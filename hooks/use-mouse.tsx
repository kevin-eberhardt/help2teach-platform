"use client";
import React from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ top: ev.clientX, left: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
