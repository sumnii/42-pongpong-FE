import styled from "@emotion/styled"
import * as font from "@style/font"

export const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const HeaderBtn = styled.button`
  height: 100%;
  padding: 4px 10px;
  margin: 6px 0px;

  background: none;
  border: none;
  cursor: pointer;
  ${(props: { clicked: boolean }) => {
    if (props.clicked) return `border-bottom: 2px solid blue;`
    return ""
  }}

  ${font.bodySemiBold}
`
