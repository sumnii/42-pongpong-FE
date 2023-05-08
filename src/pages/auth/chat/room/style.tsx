import styled from "@emotion/styled";
import * as font from "style/font";
import * as color from "style/color";
import { mini } from "style/button";
import { AiOutlineSetting } from "react-icons/ai";

export const PageLayout = styled.div`
  height: 100%;
  padding: 5px 2%;
  flex: 1 0 auto;
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const ExitBtn = styled.button`
  ${mini}
`;

export const MainBox = styled.div`
  width: 100%;
  height: 85%;
  margin-top: 10px;
`;

export const H2 = styled.h2`
  ${font.body};
  font-weight: 600;
  margin: 0;
  padding: 5px 0;
`;

export const Screen = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  padding: 12px 18px 12px;
  margin: 0 auto;
`;

export const Form = styled.form`
  width: 100%;
  margin-top: 12px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SendBtn = styled.button`
  display: flex;
  padding: 6px 12px;
  border: 1px solid;
  line-height: 1.5;
  align-items: center;
  background-color: ${(props) => (props.disabled ? `${color.lightGray}` : `${color.darkMain}`)};
  cursor: pointer;
`;

export const Input = styled.input`
  ${font.body}
  width: 100%;
  padding: 12px 18px 12px;
  border: 1px solid;
  transition: border-color 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  margin-right: 10px;
  outline: none;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SettingBtnIcon = styled(AiOutlineSetting)`
  padding: 5px 0;
  cursor: pointer;
`;
