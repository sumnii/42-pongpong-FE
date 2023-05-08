import styled from "@emotion/styled";
import * as font from "style/font";
import { mini } from "style/button";

export const PageLayout = styled.div`
  height: 100%;
  padding: 5px 15px;
  flex: 1 0 auto;
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const H2 = styled.h2`
  ${font.title};
  font-weight: 600;
  margin: 0;
  padding: 5px 0;
`;

export const ExitBtn = styled.button`
  ${mini}
`;

export const Canvas = styled.canvas`
  background: #eee;
  display: block;
  margin: 0 auto;
`;
