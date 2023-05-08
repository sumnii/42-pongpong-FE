import styled from "@emotion/styled";
import * as font from "style/font";
import * as button from "style/button";
import * as color from "style/color";

export const PageLayout = styled.div`
  height: 100%;
  padding: 5px 15px;
  flex: 1 1 auto;
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const H2 = styled.h2`
  ${font.title};
  font-weight: 600;
  margin: 0;
  padding: 5px 0;
`;

export const MatchMakingBtn = styled.button`
  ${button.basicColor};
  font-size: 1.2rem;
  padding: 10px 10px;
`;

export const GameList = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

/*
 *      Game Item
 */

export const GameItem = styled.li`
  list-style: none;

  display: flex;
  flex-direction: column;

  width: calc((100% - 30px) / 3);
  border: 1.5px solid;

  ${font.body}
`;

export const GameHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px 0;
`;

export const No = styled.span`
  text-align: center;
  ${font.bodyBold}
  margin-right: 5px;
`;

export const Rule = styled.span`
  text-align: left;
  ${font.body}
  margin-right: auto;
`;

export const EntryBtn = styled.button`
  ${button.mini}
`;

export const PlayersBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
`;

export const PlayerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const PlayerAvatar = styled.img<{ red?: boolean; blue?: boolean }>`
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  ${(props) => {
    if (props.red) return `border: 1.5px solid ${color.lightRed};`;
    if (props.blue) return `border: 1.5px solid ${color.lightBlue};`;
  }}
`;

export const PlayerName = styled.span`
  width: 7vw;
  text-align: center;
  ${font.footer};
  line-height: 1.3;
`;

export const Versus = styled.span`
  text-align: center;
`;
