import styled from "@emotion/styled";

export const UserListLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;

  padding: 10px;

  background-color: purple;
`;

export const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin: 0;
  padding: 0;
`;

export const UserItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;

  list-type: none;
  cursor: pointer;
`;

export const TmpImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: gray;
`;
