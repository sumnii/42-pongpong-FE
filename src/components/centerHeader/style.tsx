import styled from "@emotion/styled"
import * as font from "@style/font"

export const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 40px;
`

export const HeaderBtn = styled.button`
  padding-top: 10px;
  margin-bottom: 2px;

  background: none;
  border: none;
  cursor: pointer;
  ${(props: { clicked: boolean }) => {
    if (props.clicked)
      return `border-bottom: 2px solid blue;
    margin: 0;`
    return ""
  }}

  ${font.bodyBold}
`
