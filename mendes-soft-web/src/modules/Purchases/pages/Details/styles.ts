import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 30px;
  height: 85vh;
  width: 90%;
  background-color: white;
`;

export const Section = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  button {
    display: flex;
    height: 7vh;
    width: 100%;
    color: white;
    text-transform: uppercase;
    justify-content: space-evenly;
    align-items: center;
    background-color: #ff2401;
    border-radius: 10px;
  }

  label {
    font-size: 25px;
  }

  span {
    color: #07f;
    font-size: 15px;
    margin-bottom: 25px;
  }

  p {
    font-size: 20px;
    margin-bottom: 30px;
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  height: 8vh;
  width: 100%;

  margin-bottom: 2vh;
`;

export const Separate = styled.div`
  width: 0.1vw;
  background-color: gray;
  margin: 0 1vw;
`;
