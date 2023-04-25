import styled from "@emotion/styled";
import { MdOutlineMoreVert } from "react-icons/md";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { darkGray, darkMain, lightGray, lightMain } from "style/color";

/*
 *          User Info
 */

export const ProfileImg = styled.img<{ me: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 100%;

  ${(props) => {
    if (props.me) return `cursor: pointer;`;
  }}
`;

export const UserInfoText = styled.span<{ me: boolean }>`
  cursor: ${(props) => {
    if (props.me) return `pointer;`;
    return `default;`;
  }};
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
  color: ${darkMain};
`;

/*
 *          Drop Menu
 */

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
