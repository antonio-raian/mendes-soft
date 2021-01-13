import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

export const Buttons = styled.div`
  display: flex;
  height: 8vh;
  margin: 20px 0;
  width: 100%;

  button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 45%;
    height: 100%;
    margin: 0 2.5%;
    background-color: #07f5;
    font-weight: 700;
    border-radius: 10px;
    text-align: left;
  }

  .error {
    background-color: red;
    color: whitesmoke;
  }
`;
