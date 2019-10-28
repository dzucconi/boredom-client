import styled from "styled-components";

import { speed } from "../config";

export const Pointer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 0.33em;
  height: 0.33em;
  background-color: white;
  border-radius: 50%;
  z-index: 1;
  transition: transform ${1000 * speed}ms, background-color 200ms;

  ${({ isClicked }: { isClicked?: boolean }) =>
    isClicked &&
    `
    background-color: #333;
  `}
`;
