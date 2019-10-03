import { Link as InternalLink } from "react-router-dom";
import styled from "styled-components";

export const Link = styled(InternalLink)`
  display: block;
  padding: 0.5em 1em;
  color: white;
  text-decoration: none;
  transition: color 200ms;

  &:hover,
  &[data-state="clicked"] {
    color: gray;
  }
`;
