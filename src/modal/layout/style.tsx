import styled from "@emotion/styled";
import * as font from "style/font";
import * as button from "style/button";
import { darkMain, lightMain } from "style/color";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { RiSendPlane2Line } from "react-icons/ri";

/* 
  Common Modal style
*/

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;

  background: rgba(0, 0, 0, 0.1);
  cursor: default;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  ${(props) => (props.id !== "noBack" ? "background-color: rgba(0, 0, 0, 0.4);" : "")}
  z-index: 1;
`;

export const Modal = styled.dialog`
  width: 40%;
  ${(props) => (props.id === "noti" ? "height: 220px;" : "")}
  border: none;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.08);
  z-index: 1;
  top: 100px;
`;

export const BtnWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

export const Button = styled.button`
  ${button.basicColor}
  font-size: 1.1rem;

  display: inline-block;
  padding: 6px 12px;
  line-height: 1.5;
`;

export const Span = styled.span`
  font-size: 11px;
  color: ${(props) => props.color};
  cursor: pointer;
`;

export const ModalButton = styled(Button)`
  width: 30%;
  margin-top: 10px;
`;

/* 
  Notification Modal
*/

export const NotificationLayout = styled.div`
  position: relative;
  width: 100%;
  height: 95%;
  text-align: center;
  background: white;
  font-size: 14px;
  border-radius: 20px;
`;

export const NotiContent = styled.div`
  position: relative;
  height: 50%;
  text-align: center;
  overflow-y: auto;
`;

/* 
  profile avatar upload
*/

export const AvatarUploadLayout = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  background: white;
  font-size: 14px;
  border-radius: 20px;
`;

/* 
  password room entry
*/

export const CreateRoomLayout = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  background: white;
  font-size: 14px;
  border-radius: 20px;
`;

export const Input = styled.input`
  width: 60%;
  padding: 12px 18px 12px;
  border: 1.5px solid lightgray;
  border-radius: 8px;
  transition: border-color 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  margin-right: 5px;
`;

/* 
  create chat room
*/

export const Wrapper = styled.div`
  width: 100%;
  margin: 5% 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

/*
 *  DM modal
 */

export const DmLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 400px;
  height: 600px;
  padding: 20px;

  border: 1px solid;
  background-color: white;

  display: flex;
  flex-direction: column;
  cursor: default;
`;

export const DmHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const DmTitle = styled.h1`
  ${font.titleBold};
  overflow: auto;
  margin: 0;
`;

export const IconWrapper = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  padding: 0;
`;

export const CloseIcon = styled(AiOutlineCloseSquare)`
  width: 25px;
  height: 25px;
`;

export const DmChatList = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 10px;
  overflow: auto;

  list-style: none;
  padding: 0;
  margin: 0 0px 20px;

  ${font.body};
  line-height: 1.7em;
`;

export const MyChat = styled.li`
  word-wrap: break-word;
  max-width: calc(100% - 20px);
  padding: 2px 5px;
  border: 1px solid;
  background-color: white;
  position: relative;
  margin-left: auto;
  margin-right: 10px;

  ::before {
    border-top: 5px solid;
    border-left: 5px solid;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
    content: "";
    position: absolute;
    right: -10px;
    bottom: 7px;
  }

  ::after {
    border-top: 4px solid white;
    border-left: 4px solid white;
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
    content: "";
    position: absolute;
    right: -8px;
    bottom: 8px;
  }
`;

export const OpponentChat = styled.li`
  word-wrap: break-word;
  max-width: calc(100% - 20px);
  padding: 2px 5px;
  border: 1px solid;
  background-color: ${lightMain};
  position: relative;
  margin-right: auto;
  margin-left: 10px;

  ::before {
    border-top: 5px solid black;
    border-left: 5px solid transparent;
    border-right: 5px solid black;
    border-bottom: 5px solid transparent;
    content: "";
    position: absolute;
    left: -10px;
    bottom: 7px;
  }

  ::after {
    border-top: 4px solid ${lightMain};
    border-left: 4px solid transparent;
    border-right: 4px solid ${lightMain};
    border-bottom: 4px solid transparent;
    content: "";
    position: absolute;
    left: -8px;
    bottom: 8px;
  }
`;

export const InputBox = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const DmInput = styled.input`
  width: 90%;
  height: 35px;
  border: 1px solid;
  padding: 0px 5px;
  outline-style: none;
  ${font.body};
`;

export const SendBtn = styled(RiSendPlane2Line)`
  width: 30px;
  height: 30px;
  color: ${darkMain};
`;

/* 
  setting pw chat room
*/

export const SettingPwLayout = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  background: white;
  font-size: 12px;
  border-radius: 20px;
`;

/* 
  match game
*/

export const MatchGameLayout = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  background: white;
  font-size: 12px;
  border-radius: 20px;
`;

export const SpanAbsolute = styled(Span)`
  font-size: 11px;
  color: ${(props) => props.color};
  cursor: default;
  position: absolute;
`;

/* 
  accept game
*/

export const AcceptGameLayout = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background: white;
  font-size: 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

/*
 *      Recheck Modal
 */

export const ModalLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 200px;
  height: 120px;
  background: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 15px;
`;

export const Content = styled.span`
  ${font.body};
  text-align: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 30px;
`;

export const Btn = styled.button`
  ${button.basicColor};
  height: 25px;
`;
