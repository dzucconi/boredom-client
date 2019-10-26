import React, { useEffect, useState, useCallback } from "react";
import { createGlobalStyle } from "styled-components";
import screenfull from "screenfull";

const DisableMouse = createGlobalStyle`
  html {
    pointer-events: none;
    cursor: none;
  }
`;

export const Fullscreener = () => {
  const [isToggled, setToggle] = useState(false);

  const handleToggle = useCallback(() => {
    setToggle(prevToggle => !prevToggle);

    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }, []);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "h":
          return handleToggle();
        default:
          break;
      }
    },
    [handleToggle]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return (): void => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  return <>{isToggled ? <DisableMouse /> : null}</>;
};
