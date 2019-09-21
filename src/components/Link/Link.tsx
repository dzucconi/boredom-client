import { Link as InternalLink } from "react-router-dom";
import styled, { css } from "styled-components";

const hoverMixin = css`
  color: gray;
`;

export const Link = styled(InternalLink)`
  display: block;
  padding: 0.5em 1em;
  color: white;
  text-decoration: none;
  transition: color 200ms;

  ${({ hover = false }: { hover?: boolean }) => hover && hoverMixin}
  &:hover {
    ${hoverMixin}
  }
`;
