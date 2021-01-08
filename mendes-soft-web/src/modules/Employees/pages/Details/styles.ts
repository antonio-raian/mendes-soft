import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  padding: 20px;

  button {
    display: flex;
    justify-content: space-around;
    align-items: center;

    border-color: transparent;
    border-radius: 5px;
    padding: 10px;

    &:hover {
      background-color: #07fa;
    }

    &:active {
      background-color: #07f;
    }
  }
`;

export const ContentLeft = styled.div`
  width: 40%;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    border: 2px solid #07f;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;

    > span {
      font-size: 20px;
      margin: 20px;
    }
  }

  section {
    display: flex;
    justify-content: space-around;
    align-items: center;

    padding: 10px;
    margin: 5px 10px;

    > button {
      width: 45%;
      background-color: #ddd;
      font-size: 25px;

      &.delete {
        color: white;
        background-color: #f00a;

        &:hover {
          background-color: #f00c;
        }

        &:active {
          background-color: #f00;
        }
      }
    }
  }
`;

export const ContentRight = styled.div`
  width: 60%;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50%;
    border: 2px solid #07f;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;

    > section {
      width: 95%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > button {
        width: 25%;
        background-color: #07f6;
      }
    }
  }
`;
