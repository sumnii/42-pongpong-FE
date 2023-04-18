import styled from "@emotion/styled";
import { MdOutlineMoreVert } from "react-icons/md";
import { VscBell, VscBellDot } from "react-icons/vsc";

/*
 *          User Info
 */

export const TmpImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: gray;
  cursor: pointer;
`;

export const UserInfoText = styled.span`
  cursor: pointer;
`;

export const KebabIcon = styled(MdOutlineMoreVert)`
  width: 20px;
  height: 100%;
  margin-left: auto;
  cursor: pointer;
`;

export const EmptyNotiIcon = styled(VscBell)`
  width: 16px;
  padding: 2px;
  height: 100%;
  margin-left: auto;
  cursor: pointer;
`;

export const NewNotiIcon = styled(VscBellDot)`
  width: 16px;
  padding: 2px;
  height: 100%;
  margin-left: auto;
  cursor: pointer;
  color: blue;
`;

/*
 *          Drop Menu
 */

export const DropMenuLayout = styled.div`
  width: 80px;
  border: 1px solid black;
  border-bottom: 0;
`;

export const DropMenuItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 20px;
  border-bottom: 1px solid black;
`;
