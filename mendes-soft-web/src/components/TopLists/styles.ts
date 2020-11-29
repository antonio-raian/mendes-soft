import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 10vh;
  width: 90%;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }

  input {
    margin: 0 10px;
    height: 7vh;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0 10px;
  }

  button {
    padding: 2vh;
  }
`;
