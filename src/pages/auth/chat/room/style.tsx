import styled from "@emotion/styled";
import * as font from "style/font";
import * as color from "style/color";
import { mini } from "style/button";
import { AiOutlineSetting } from "react-icons/ai";
import { lightMain } from "style/color";

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
  overflow-y: auto;
  padding: 12px 0 0;
  margin: 0 auto;
`;

export const ChatList = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 10px;
  overflow: auto;

  list-style: none;
  padding: 0;
  margin: 0 0px 20px;

  ${font.body};
  line-height: 1.7em;
`;

export const NoticeChat = styled.li`
  margin: 0 auto;
`;

export const MyChat = styled.li`
  max-width: calc(100% - 20px);
  padding: 2px 5px;
  border: 1px solid;
  background-color: ${lightMain};
  position: relative;
  margin-left: auto;
  margin-right: 10px;

  ::before {
    border-top: 5px solid;
    border-left: 5px solid;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
    content: "";
    position: absolute;
    right: -10px;
    bottom: 7px;
  }

  ::after {
    border-top: 4px solid ${lightMain};
    border-left: 4px solid ${lightMain};
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
    content: "";
    position: absolute;
    right: -8px;
    bottom: 8px;
  }
`;

export const OpponentSet = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OpponentFrom = styled.span`
  margin-left: 12px;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const OpponentChat = styled.li`
  max-width: calc(100% - 20px);
  padding: 2px 5px;
  border: 1px solid;
  background-color: white;
  position: relative;
  margin-right: auto;
  margin-left: 10px;

  ::before {
    border-top: 5px solid black;
    border-left: 5px solid transparent;
    border-right: 5px solid black;
    border-bottom: 5px solid transparent;
    content: "";
    position: absolute;
    left: -10px;
    bottom: 7px;
  }

  ::after {
    border-top: 4px solid white;
    border-left: 4px solid transparent;
    border-right: 4px solid white;
    border-bottom: 4px solid transparent;
    content: "";
    position: absolute;
    left: -8px;
    bottom: 8px;
  }
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
  padding: 12px 10px 12px;
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
