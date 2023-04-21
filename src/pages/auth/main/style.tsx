import styled from "@emotion/styled";
import * as font from "style/font";
import { darkMain } from "style/color";

export const MainLayout = styled.div`
  height: calc(100% - 40px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
`;

export const H1 = styled.h1`
  ${font.h1};
  margin: 70px 0;
`;

export const TextBold = styled.p`
  ${font.bodyBold};
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;

  border-top: 1px solid;
  border-bottom: 1px solid;
`;

export const Text = styled.span`
  display: inline;
  margin: 5px;

  ${font.body};
  ${(props: { featured?: boolean }) => {
    return props.featured ? `color: ${darkMain}; font-weight: 600;` : "";
  }}
`;
