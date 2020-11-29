import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;

  background-color: #07f;
  img {
    width: 50%;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 50vw;
  justify-content: center;
  align-items: center;
  background-color: white;

  button {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 8vh;

    margin: 4vh 0;
    background-color: #07f5;
    border: 0;
    border-radius: 5px;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
  margin-bottom: 5vh;
  img {
    width: 80%;
  }
`;
