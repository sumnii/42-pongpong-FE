import styled from "@emotion/styled";
import { MdOutlineMoreVert } from "react-icons/md";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { GrTrash } from "react-icons/gr";
import { darkGray, darkMain, lightGray, lightMain } from "style/color";
import { lightRed } from "style/color";

/*
 *          User Info
 */

export const UserItem = styled.li<{ clickable?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  list-style-type: none;

  ${(props) => {
    if (props.clickable) return `cursor: pointer;`;
  }}
`;

export const LoadingImg = styled.img<{ clickable?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${darkGray};
`;

export const ProfileImg = styled.img<{ clickable: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 100%;

  ${(props) => {
    if (props.clickable) return `cursor: pointer;`;
  }}
`;

export const UserInfoText = styled.span<{ clickable: boolean }>`
  cursor: ${(props) => {
    if (props.clickable) return `pointer;`;
    return `default;`;
  }};
`;

/*
 *          Dm: Trash Can
 */

export const ExitDmIcon = styled(GrTrash)`
  width: 20px;
  height: 100%;
  padding: 2px;
  margin-left: auto;
  cursor: pointer;
  path {
    stroke: ${lightRed};
  }
`;

/*
 *          MyProfile: Notification
 */

export const EmptyNotiIcon = styled(VscBell)`
  width: 20px;
  padding: 2px;
  height: 100%;
  margin-left: auto;
  cursor: pointer;
`;

export const NewNotiIcon = styled(VscBellDot)`
  width: 20px;
  padding: 2px;
  height: 100%;
  margin-left: auto;
  cursor: pointer;
  color: ${darkMain};
`;

/*
 *          Basic: Drop Menu
 */

export const KebabIcon = styled(MdOutlineMoreVert)`
  width: 20px;
  height: 100%;
  margin-left: auto;
  cursor: pointer;
`;

export const DropModalOverlay = styled.div`
  position: fixed;
  width: 20vw;
  height: 100vh;
  right: 0;
  top: 0;

  background: rgba(0, 0, 0, 0.05);
`;

export const DropMenuLayout = styled.div`
  position: absolute;
  transform: translate(-3px, 57%);
  right: 10px;

  border: 1px solid black;
  border-bottom: 0;
  background-color: white;
`;

export const DropMenuItemBox = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 20px;
  border-bottom: 1px solid black;

  cursor: pointer;
  ${(props) => {
    return props.disabled ? `color: ${darkGray}; cursor: default;` : null;
  }}

  :hover {
    ${(props) => {
      return props.disabled
        ? `background-color: ${lightGray}; cursor: default;`
        : `background-color: ${lightMain};`;
    }}
  }
`;
