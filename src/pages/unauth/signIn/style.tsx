import styled from "@emotion/styled";

export const SignInLayout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const BtnWrapper = styled.div`
  width: 100%;
  margin: 10% 0;

  display: flex;
  justify-content: space-between;
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
  border: none;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 0;
  overflow: hidden;
  z-index: 1;
`

export const Form = styled.form`
  background-color: #ffffff;
  padding: 1rem;
  width: 20rem;
`

export const Button = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  border: 1px solid lightgray;
  line-height: 1.5;
`
