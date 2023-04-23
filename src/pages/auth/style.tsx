import styled from "@emotion/styled";

export const HomeLayout = styled.div`
  display: flex;
  height: calc(100vh - 40px);
`;

export const AppLayout = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const LeftSideLayout = styled.div`
  height: calc(100vh - 40px);
  width: 20vw;

  border-right: 0.5px solid;
`;

export const PageLayout = styled.div`
  display: flex;
  height: 100%;
  width: 80vw;
`;
