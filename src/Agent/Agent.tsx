import React from "react";
import useMutationObserver from "@rooks/use-mutation-observer";
import { createGlobalStyle } from "styled-components";

import { Pointer } from "./Pointer";
import { wait, sample, move, transformTo, area, Point } from "./utils";

interface Props {
  surface: React.RefObject<HTMLDivElement>;
}

const DisableMouse = createGlobalStyle`
  html {
    pointer-events: none;
    cursor: none;
  }
`;

export const Agent: React.FC<Props> = ({ surface }) => {
  const [prevLinksLength, setPrevLinksLength] = React.useState(0);
  const [isClicked, setIsClicked] = React.useState(false);
  const [point, nextMove] = React.useState<Point>({ x: 0, y: 0 });

  useMutationObserver(surface, async () => {
    const links = Array.from(document.getElementsByTagName("a"));

    if (links.length !== 0 && prevLinksLength !== links.length) {
      setPrevLinksLength(links.length);

      const link = sample(links);

      nextMove(move());
      await wait(4000);

      window.scroll({
        top: area(link).center.y - window.innerHeight / 2,
        left: 0,
        behavior: "smooth"
      });

      await wait(2000);
      nextMove(area(link).center);
      await wait(200);

      // Hover link
      link.setAttribute("data-state", "hover");
      await wait(1000);

      // Click the link
      setIsClicked(true);
      await wait(250);
      link.click();
      setIsClicked(false);
    } else {
      setPrevLinksLength(links.length);
    }
  });

  return (
    <>
      <DisableMouse />

      <Pointer style={transformTo(point)} isClicked={isClicked} />
    </>
  );
};
