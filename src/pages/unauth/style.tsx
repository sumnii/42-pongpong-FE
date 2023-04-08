import styled from "@emotion/styled";

export const AppLayout = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  background: linear-gradient(155deg,
    rgb(224 189 198 / 50%),
    rgb(199 255 242 / 50%)) no-repeat;
`;

export const LeftSideLayout = styled.div`
  height: 100%;
  width: 20%;

  background-color: green;
`;

export const CenterLayout = styled.div`
  height: 100%;
  width: 60%;

  background-color: blue;
`;

export const RightSideLayout = styled.div`
  height: 100%;
  width: 20%;

  display: flex;
  flex-direction: column;
`;
