import styled, { keyframes } from "styled-components";

interface Props {
  children: string;
}

const fadeOut = keyframes`
  100% {
    opacity: 0;
  }
`;

const SPEED = 300.0;
const WHITESPACE = /\W+/g;

const estimate = (input: string) => {
  const words = input.split(WHITESPACE).length;
  return (words / SPEED) * 60.0 * 1000.0;
};

export const Overlay = styled.div.attrs((props: Props) => ({
  style: { animationDelay: `${estimate(props.children)}ms` }
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
  animation: ${fadeOut} 1s ease-out;
  animation-fill-mode: forwards;
  transform: translate3d(0, 0, 0);
  pointer-events: none;
  touch-action: none;
`;
