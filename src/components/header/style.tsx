import styled from "@emotion/styled";
import { lightMain, darkMain, basicMain } from "style/color";
import * as font from "style/font";

export const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 40px;
  padding: 5px 0;
  border-bottom: 0.5px solid;
  background-color: ${lightMain};
`;

export const HeaderBtn = styled.button`
  margin-top: 5px;
  ${font.bodyBold}
  height: 17px;

  background: none;
  border: none;
  ${(props: { clicked: boolean }) => {
    if (props.clicked)
      return `border-bottom: 11px solid ${basicMain};
    color: ${darkMain};`;
    return "";
  }}
  cursor: pointer;

  :hover {
    color: ${darkMain};
  }
`;
