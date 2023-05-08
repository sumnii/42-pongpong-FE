import styled from "@emotion/styled";
import * as font from "style/font";
import * as button from "style/button";

export const PageLayout = styled.div`
  height: 100%;
  padding: 5px 15px;
  flex: 1 1 auto;
`;

export const ChatListLayout = styled.div`
  height: calc(50% - 17px);
  border-bottom: 0.5px solid;
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const H2 = styled.h2`
  ${font.title};
  font-weight: 600;
  margin: 0;
  padding: 5px 0;
`;

export const MakeRoomBtn = styled.button`
  ${button.basicColor};
  font-size: 1.2rem;
  padding: 8px 10px;
`;

export const ChatList = styled.ul`
  margin: 0;
  padding: 0;

  height: 80%;
  overflow: auto;
`;

export const ChatItem = styled.li`
  list-style: none;

  height: 30px;
  display: flex;
  align-items: center;
  gap: 2px;

  ${font.body}
  ${(props: { head?: boolean }) => {
    return props.head ? `font-weight: 600;` : "";
  }}
`;

/*
 *      Chat List Item
 */

export const No = styled.span`
  width: 7%;
  text-align: center;
`;

export const Subject = styled.span`
  width: 60%;
  display: flex;
  align-items: center;
`;

export const Owner = styled.span`
  width: 16%;
`;

export const ParticipantsCnt = styled.span`
  width: 7%;
  text-align: center;
`;

export const EntryBtn = styled.button`
  ${button.mini}
  width: 45px;
  ${(props: { head?: boolean }) => {
    return props.head ? "visibility: hidden;" : "";
  }}
  margin: auto;
`;
