import styled from "@emotion/styled";

export const SignInLayout = styled.div`
  position: relative;
  margin: auto;
  max-width: 400px;
  width: 100%;
  text-align: center;
  background: white;
  box-shadow: 0 1px 3px 1px rgba(0,0,0,.08);
  font-size: 14px;
  border-radius: 20px;
  padding: 24px;
`;

export const BtnWrapper = styled.div`
  width: 100%;
  margin: 10% 0;
  display: flex;
  justify-content: space-around;
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`

export const Modal = styled.dialog`
  width: 80%;
  border: none;
  border-radius: 12px;
  box-shadow: 0 1px 3px 1px rgba(0,0,0,.08);
  padding: 0;
  z-index: 1;
`

export const Button = styled.button`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 5px;
  border: 1px solid lightgray;
  line-height: 1.5;
  width: 40%;
`

export const FormLogo = styled.div`
  text-align: center;
  margin-bottom: 16px;
`

export const Input = styled.input`
  width: 50%;
  padding: 12px 18px 12px;
  border: 1.5px solid lightgray;
  border-radius: 8px;
  transition: border-color .2s cubic-bezier(.25,.1,.25,1);
  margin-bottom: 4px;
`

export const Span = styled.span`
  color: red;
  font-size: 11px;
`

export const ModalButton = styled(Button)`
  width: 50%;
  margin: 12px 10px;

`