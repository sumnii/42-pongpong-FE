import styled from "@emotion/styled";

export const dmListLayout = styled.div`
  display: flex;
  flex-direction: column;

  height: 50%;
  max-width: 400px;
  width: 400px;

  padding: 10px;
  background-color: pink;
`;

export const dmWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;

export const tmpImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: gray;
`;

export const textWrapper = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`;
