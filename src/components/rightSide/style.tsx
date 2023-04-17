import styled from "@emotion/styled";

/*
 *          My Profile
 */

export const MyProfileLayout = styled.div`
  display: flex;
  flex-direction: column;

  padding: 8px 5px 8px 10px;
  border-left: 0.5px solid black;
`;

/*
 *          User List
 */

export const UserListLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;

  padding: 8px 5px 8px 10px;
  border-top: 0.5px solid black;
  border-left: 0.5px solid black;
`;

export const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin: 0;
  padding: 0;

  overflow: auto;
`;

export const UserItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;
  list-style-type: none;
`;
