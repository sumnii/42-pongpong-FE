import styled from "@emotion/styled";

export const AppLayout = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
`;

export const LeftSideLayout = styled.div`
  height: 100%;
  width: 20%;

  border-right: 0.5px solid;
`;

export const CenterLayout = styled.div`
  height: 100%;
  width: 60%;
`;

export const RightSideLayout = styled.div`
  height: 100%;
  width: 20%;

  display: flex;
  flex-direction: column;
`;
