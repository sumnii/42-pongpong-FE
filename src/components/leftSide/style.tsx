import styled from "@emotion/styled";
import { darkGray } from "style/color";
import * as font from "style/font";
import * as button from "style/button";

export const ProfileLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  padding: 10px;
`;

export const Title = styled.h2`
  ${font.titleBold};
  margin-bottom: 0;
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
  /* max-height: 300px; */
  /* flex: 1 0 auto; */
  overflow: auto;
`;

export const HistoryItem = styled.li`
  display: flex;
  flex-direction: column;
`;

export const Players = styled.div`
  display: flex;
  justify-content: center;
`;

export const Player = styled.span`
  width: 40;
  text-align: center;
`;

export const Versus = styled.span`
  width: 20%;
  text-align: center;
`;

export const Score = styled.span`
  text-align: center;
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
