import styled from "@emotion/styled";
import * as font from "style/font";
// import * as button from "style/button"

export const PageLayout = styled.div`
  height: calc(100% - 40px);
  padding: 5px 15px;
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
