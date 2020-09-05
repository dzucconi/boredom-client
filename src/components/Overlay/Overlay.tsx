import styled, { keyframes } from "styled-components";

import { speed } from "../../config";
import { estimate } from "../../lib/estimate";

export const FADE_SPEED = 1000;

interface Props {
  children: string;
}

const fadeOut = keyframes`
  100% {
    opacity: 0;
  }
`;

export const Overlay = styled.div.attrs((props: Props) => ({
  style: { animationDelay: `${estimate(props.children)}ms` },
}))<Props>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em 1.5em;
  text-align: center;
  cursor: default;
  user-select: none;
  color: gold;
  background-color: black;
  animation: ${fadeOut} ${FADE_SPEED * speed}ms ease-out;
  animation-fill-mode: forwards;
  pointer-events: none;
  touch-action: none;
`;
