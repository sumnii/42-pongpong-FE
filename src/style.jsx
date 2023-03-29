import styled from "@emotion/styled";

export const AppLayout = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
`;

export const LeftSideLayout = styled.div`
  height: 100%;
  width: 300px;

  background-color: green;
`;

export const CenterLayout = styled.div`
  height: 100%;
  width: 100%;

  background-color: blue;
`;

export const RightSideLayout = styled.div`
  height: 100%;
  width: 300px;

  display: flex;
  flex-direction: column;

  background-color: purple;
`;
