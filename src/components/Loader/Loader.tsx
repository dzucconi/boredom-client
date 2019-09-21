import styled, { keyframes } from "styled-components";

interface Props {
  percentage: number;
}

const TRANSITION_DURATION = 500;

const trickling = keyframes`
  100% {
    transform: translateX(99%);
  }
`;

export const Loader = styled.div.attrs((props: Props) => ({
  style: {
    transform: `translateX(${props.percentage}%)`,
    ...(props.percentage === 100
      ? {
          opacity: 0
        }
      : {})
  }
}))<Props>`
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 3px;
  animation: ${trickling} 60s cubic-bezier(0, 1, 1, 1);
  animation-fill-mode: forwards;
  transition: transform 100ms, opacity 1s;
  transition: transform ${TRANSITION_DURATION}ms ease-out,
    opacity ${TRANSITION_DURATION / 2}ms ${TRANSITION_DURATION / 2}ms ease-in;
  transform: translate3d(0, 0, 0);
  z-index: 100;
  background-color: white;
`;
