import styled, { keyframes } from "styled-components";

const fadeOut = keyframes`
  100% {
    opacity: 0;
    pointer-events: none;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  text-align: center;
  cursor: default;
  user-select: none;
  color: gold;
  background-color: black;
  animation: ${fadeOut} 1s ease-out;
  animation-fill-mode: forwards;
  animation-delay: 2s;
  transform: translate3d(0, 0, 0);
`;
