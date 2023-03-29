import styled from "@emotion/styled";

export const profileLayout = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
`;

export const tmpImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: gray;

  margin: 20px auto;
`;

export const infoWrapper = styled.div`
  display: flex;
`;

export const infoLabel = styled.span`
  width: 50%;
  line-height: 30px;
`;

export const infoValue = styled.span`
  line-height: 30px;
`;

export const players = styled.div`
  display: flex;
  justify-content: center;
`;

export const player = styled.span`
  width: 40;
  text-align: center;
`;

export const versus = styled.span`
  width: 20%;
  text-align: center;
`;

export const score = styled.span`
  text-align: center;
`;
