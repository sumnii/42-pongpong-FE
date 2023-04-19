import styled from "@emotion/styled";
import * as font from "style/font";
import * as button from "style/button";

export const ProfileLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;

  padding: 10px;
`;

export const Title = styled.h2`
  ${font.titleBold};
  margin-bottom: 0;
`;

/*
 *      Profile Item
 */

export const TmpImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;

  margin: 20px auto;
`;

export const InfoWrapper = styled.div`
  display: flex;
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
 *      Game History
 */

export const HistoryList = styled.ul`
  height: 400px;
  overflow: auto;
`;

export const HistoryItem = styled.li`
  display: flex;
  flex-direction: column;
  list-type: none;
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
