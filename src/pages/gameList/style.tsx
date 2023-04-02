import styled from "@emotion/styled"
import * as font from "@style/font"
import * as button from "@style/button"

export const PageLayout = styled.div`
  height: calc(100% - 40px);
  padding: 5px 15px;
`

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

export const H2 = styled.h2`
  ${font.title};
  font-weight: 600;
  margin: 0;
  padding: 5px 0;
`

export const MatchMakingBtn = styled.button`
  ${button.basicColor};
  font-size: 1.2rem;
  padding: 10px 10px;
`

export const GameList = styled.ul`
  padding: 0;
`

export const GameItem = styled.li`
  list-style: none;

  height: 30px;
  display: flex;
  align-items: center;
  gap: 2px;

  ${font.body}
  ${(props: { head?: boolean }) => {
    return props.head ? `font-weight: 600;` : ""
  }}
`

/*
 *      Game Item
 */

export const No = styled.span`
  width: 7%;
  text-align: center;
`

export const Player = styled.span`
  width: 25%;
  text-align: ${(props: { left?: boolean }) => {
    return props.left ? "right" : "left"
  }};
`

export const Versus = styled.span`
  width: 5%;
  text-align: center;
`

export const Score = styled.span`
  width: 11.5%;
  text-align: ${(props: { left?: boolean }) => {
    return props.left ? "right" : "left"
  }};
`

export const EntryBtn = styled.button`
  width: 10%;
  ${button.mini}
  ${(props: { disabled?: boolean }) => {
    return props.disabled ? "background-color: white; cursor: default;" : ""
  }}
  margin: auto;
`
