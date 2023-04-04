import styled from "@emotion/styled";

export const ProfileLayout = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
`;

export const TmpImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: gray;

  margin: 20px auto;
`;

export const InfoWrapper = styled.div`
  display: flex;
`;

export const InfoLabel = styled.span`
  width: 50%;
  line-height: 30px;
`;

export const InfoValue = styled.span`
  line-height: 30px;
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
