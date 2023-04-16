import styled from "@emotion/styled";
import { MdOutlineMoreVert } from "react-icons/md";

/*
 *          My Profile
 */

export const MyProfileLayout = styled.div`
  display: flex;
  flex-direction: column;

  padding: 8px 10px;
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

  list-type: none;
`;

export const TmpImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: gray;
  cursor: pointer;
`;

export const UserInfo = styled.span`
  cursor: pointer;
`;

export const MoreIcon = styled(MdOutlineMoreVert)`
  width: 20px;
  height: 100%;
  margin-left: auto;
  cursor: pointer;
`;
