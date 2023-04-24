import styled from "@emotion/styled";

/* 
  Common Modal style
*/

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

export const Modal = styled.dialog`
  width: 40%;
  ${props => props.id  === "noti" ? "height: 200px;" : ""}
  border: none;
  border-radius: 12px;
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
  display: inline-block;
  padding: 6px 12px;
  border-radius: 5px;
  border: 1px solid lightgray;
  line-height: 1.5;
`;
export const Span = styled.span`
  font-size: 11px;
  color: ${(props) => props.color};
  cursor: pointer;
`;

export const ModalButton2 = styled(Button)`
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
  height: 95%;
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
  width: 50%;
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
`;
