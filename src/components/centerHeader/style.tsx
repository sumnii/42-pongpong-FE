import styled from "@emotion/styled";
import { lightMain, darkMain } from "style/color";
import * as font from "style/font";

export const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 40px;
  padding: 5px 0;
  border-bottom: 0.5px solid;
`;

export const HeaderBtn = styled.button`
  margin-bottom: 2px;
  ${font.bodyBold}

  background: none;
  border: none;
  ${(props: { clicked: boolean }) => {
    if (props.clicked)
      return `border-bottom: 2px solid ${lightMain};
    margin: 0;
    color: ${darkMain};`;
    return "";
  }}
  cursor: pointer;

  :hover {
    color: ${darkMain};
  }
`;
