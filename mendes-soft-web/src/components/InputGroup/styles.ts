import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  > div {
    flex: 1;
    margin: 0 5px;

    & + div {
      margin-top: 0;
    }

    &:first-child {
      margin-left: 0px;
    }

    &:last-child {
      margin-right: 0px;
    }
  }
`;
