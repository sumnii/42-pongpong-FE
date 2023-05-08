import styled from "@emotion/styled";
import { BsPeople, BsEnvelope, BsEnvelopeExclamation } from "react-icons/bs";
import { darkMain } from "style/color";

export const RightSideLayout = styled.div`
  height: 100%;
  width: 20vw;

  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  border-left: 0.5px solid;
`;

/*
 *            My Profile
 */

export const MyProfileLayout = styled.div`
  display: flex;
  flex-direction: column;

  padding: 8px 5px 8px 10px;
  border-bottom: 0.5px solid black;
`;

/*
 *            Friend & DM Menu Bar
 */

export const BarLayout = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;

  padding: 8px 5px 0 10px;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
`;

export const FriendIcon = styled(BsPeople)`
  width: 20px;
  height: 20px;
  pointer-events: none;
`;

export const DmIcon = styled(BsEnvelope)`
  width: 20px;
  height: 20px;
  pointer-events: none;
`;

export const NewDmIcon = styled(BsEnvelopeExclamation)`
  width: 20px;
  height: 20px;
  pointer-events: none;
  color: ${darkMain};
`;

/*
 *          User List
 */

export const UserListLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;

  padding: 8px 5px 8px 10px;
  border-bottom: 0.5px solid;
  overflow: auto;
`;

export const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin: 0;
  padding: 0;

  overflow: auto;
`;
