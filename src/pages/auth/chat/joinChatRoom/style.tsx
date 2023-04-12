import styled from "@emotion/styled"
import * as button from "@style/button"

export const EntryBtn = styled.button`
  width: 10%;
  ${button.mini}
  ${(props: { head?: boolean }) => {
    return props.head ? "background-color: white; cursor: default;" : ""
  }}
  margin: auto;
`
