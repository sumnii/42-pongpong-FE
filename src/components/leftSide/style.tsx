import styled from "@emotion/styled";
import { darkGray, lightBlue, lightRed, lightMain } from "style/color";
import { AiOutlineSetting } from "react-icons/ai";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import * as font from "style/font";
import * as button from "style/button";

export const ProfileLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  padding: 10px;
`;

export const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Title = styled.h2`
  ${font.titleBold};
  margin: 0;
`;

export const SettingBtn = styled(AiOutlineSetting)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

/*
 *      Setting Modal
 */

export const SettingBox = styled.div`
  position: absolute;
  width: 350px;
  height: 220px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 20px;
`;

export const RowBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const ToggleWrapper = styled.div``;

export const ToggleOnIcon = styled(BsToggleOn)`
  width: 20px;
  height: 20px;
`;

export const ToggleOffIcon = styled(BsToggleOff)`
  width: 20px;
  height: 20px;
`;

export const AuthSection = styled.div<{ visible?: boolean }>`
  margin-top: 10px;
  padding: 0 20px;
  width: 100%;
  ${(props) => {
    return props.visible ? `` : `visibility: hidden;`;
  }}
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 60%;
  height: 35px;
  padding: 12px 10px 12px;
  border: 1.5px solid lightgray;
  outline: none;

  ${font.footer}
  font-size: 1.2rem;

  margin-bottom: 4px;
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  ${button.basicColor}
  width: 40%;
  height: 35px;
`;

export const Span = styled.span`
  font-size: 11px;
  color: ${(props) => props.color};
  padding-left: 5px;
  text-align: start;
`;

/*
 *      Profile Item
 */

export const LoadingImg = styled.img<{ clickable?: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  flex-shrink: 0;
  margin: 20px auto;

  background-color: ${darkGray};
`;

export const ProfileImg = styled.img<{ me: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  flex-shrink: 0;

  margin: 20px auto;
  ${(props) => {
    if (props.me) return `cursor: pointer;`;
  }}
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const InfoLabel = styled.span`
  width: 80px;
  ${font.bodyBold}
  line-height: 30px;
`;

export const InfoValue = styled.span`
  ${font.body}
  line-height: 30px;
`;

/*
 *      Badge
 */

export const BadgeBox = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 5px;
`;

export const BadgeSet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

export const BadgeImg = styled.img`
  width: 35px;
  border-radius: 50%;
`;

/*
 *      Game History
 */

export const HistoryList = styled.ul`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  overflow: auto;
  padding: 0;
`;

export const HistoryItem = styled.li`
  display: flex;
  flex-direction: column;
  ${font.footer}
  line-height: 1.5;

  border: 1.5px solid;
  margin: 8px 5% 0;
  padding: 10px 0 5px;
  position: relative;
`;

export const Rule = styled.span`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translate(-50%, 0);
  white-space: nowrap;

  background-color: white;
  padding: 0 5px;
`;

export const Players = styled.div`
  display: flex;
  justify-content: center;
`;

export const Player = styled.span<{ winner?: boolean }>`
  width: 40%;
  text-align: center;
  ${(props) => {
    if (props.winner) return `font-weight: 600;`;
  }}
`;

export const Versus = styled.span`
  width: 10%;
  text-align: center;
`;

export const ScoreBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const Score = styled.span<{ winner?: boolean; blue?: boolean; red?: boolean }>`
  width: 40%;
  text-align: center;
  ${(props) => {
    if (props.winner) return `font-weight: 600;`;
  }}
  ${(props) => {
    if (props.blue) return `color: ${lightBlue};`;
    if (props.red) return `color: ${lightRed};`;
  }}
`;

/*
 *      Profile Button
 */

export const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 30px 0;
`;

export const Button = styled.button`
  ${button.basicColor}
  width: 70px;
  height: 25px;
`;
