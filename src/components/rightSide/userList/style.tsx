import styled from "@emotion/styled"

export const userListLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;

  padding: 10px;

  background-color: purple;
`

export const userList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin: 0;
  padding: 0;
`

export const userItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;

  list-type: none;
  cursor: pointer;
`

export const tmpImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: gray;
`
