import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  > div {
    flex: 1;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;

    & + div {
      margin-top: 0px;
    }

    &:first-child {
      margin-left: 0px;
    }

    &:last-child {
      margin-right: 0px;
      margin-top: 0px;
    }
  }
`;
