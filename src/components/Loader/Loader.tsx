import React from "react";
import styled from "styled-components";

interface Props {
  percentage: number;
}

const ANIMATION_DURATION = 300;

const Bar = styled.div.attrs((props: Props) => ({
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
  transition: transform 100ms, opacity 1s;
  transition: transform ${ANIMATION_DURATION}ms ease-out,
    opacity ${ANIMATION_DURATION / 2}ms ${ANIMATION_DURATION / 2}ms ease-in;
  transform: translate3d(0, 0, 0);
  z-index: 100;
  background-color: white;
`;

export const Loader: React.FC<Props> = ({ percentage }) => {
  return <Bar percentage={percentage} />;
};
