import styled from "@emotion/styled";

export const LoadingCircle = styled.div<{ w: number; h: number }>`
  display: inline-block;
  ${(props) => {
    return `width: ${props.w}px;
    height: ${props.h}px;`;
  }}
  margin: auto;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export default LoadingCircle;
