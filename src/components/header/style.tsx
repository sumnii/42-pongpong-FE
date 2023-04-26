import styled from "@emotion/styled";
import { lightMain, darkMain, basicMain } from "style/color";
import * as font from "style/font";

export const HeaderLayout = styled.div`
  display: flex;
  height: 40px;
  padding: 5px 0;
  border-bottom: 0.5px solid;
  background-color: ${lightMain};
`;

export const HeaderWrapper = styled.div`
  width: 60vw;
  display: flex;
  justify-content: space-evenly;
`;

export const Subject = styled.h1`
  display: flex;
  justify-content: center;
  width: 20vw;
  ${font.bodyBold}
  height: 17px;
`;

export const HeaderBtn = styled.button`
  margin-top: 5px;
  ${font.bodyBold}
  height: 17px;

  background: none;
  border: none;
  ${(props: { clicked: boolean }) => {
    if (props.clicked)
      return `background: linear-gradient(to top, ${basicMain} 50%, transparent 50%);
    color: ${darkMain};`;
    return "";
  }}
  cursor: pointer;

  :hover {
    color: ${darkMain};
  }
`;
