import React from "react";
import useMutationObserver from "@rooks/use-mutation-observer";

import { Pointer } from "./Pointer";
import {
  fuzzyWait,
  wait,
  sample,
  move,
  transformTo,
  area,
  Point
} from "./utils";
import { audio } from "../audio";
import { estimate } from "../lib/estimate";
import { FADE_SPEED } from "../components/Overlay";

interface Props {
  surface: React.RefObject<HTMLDivElement>;
}

// TODO: Also randomly scroll?
const idle = (ms: number, fn = () => {}) =>
  new Promise(async resolve => {
    fn();
    await wait(ms);

    // TODO: improve this
    if (Math.random() > 0.5) {
      fn();
      await fuzzyWait(100, 4000);
    }

    if (Math.random() > 0.5) {
      fn();
      await fuzzyWait(100, 4000);
    }

    resolve();
  });

interface State {
  running: boolean;
  clicked: boolean;
  point: Point;
}

type Action =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "CLICK" }
  | { type: "MOVE"; payload: { point: Point } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CLICK":
      return { ...state, clicked: true };
    case "START":
      return { ...state, running: true };
    case "STOP":
      return { ...state, running: false, clicked: false };
    case "MOVE":
      return { ...state, point: action.payload.point };
  }
};

export const Agent: React.FC<Props> = ({ surface }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    running: false,
    clicked: false,
    point: { x: 0, y: 0 }
  });

  useMutationObserver(surface, async () => {
    const links = Array.from(document.getElementsByTagName("a"));

    if (links.length !== 0 && !state.running) {
      dispatch({ type: "START" });

      // Pick a random target link
      const link = sample(links);

      // Pull message out of `document.title`
      await idle(estimate(document.title), () =>
        dispatch({ type: "MOVE", payload: { point: move() } })
      );

      await wait(FADE_SPEED);

      // Scroll to target link
      window.scroll({
        top: area(link).center.y - window.innerHeight / 2,
        left: 0,
        behavior: "smooth"
      });

      await fuzzyWait(1500, 2500);

      // Move pointer to target link
      dispatch({ type: "MOVE", payload: { point: area(link).center } });

      await fuzzyWait(750, 1250);

      // Visually/sonically "click" the link
      link.setAttribute("data-state", "clicked");
      dispatch({ type: "CLICK" });
      audio.tock.play();
      await fuzzyWait(200, 400);

      // Actually click the link, triggering the route
      dispatch({ type: "STOP" });
      link.click();
    }
  });

  return <Pointer style={transformTo(state.point)} isClicked={state.clicked} />;
};
