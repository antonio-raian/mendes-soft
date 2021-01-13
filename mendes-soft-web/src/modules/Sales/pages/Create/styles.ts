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
  justify-content: center;
  button {
    display: flex;
    height: 6vh;
    width: 10vw;
    justify-content: space-evenly;
    align-items: center;
    text-align: left;
    background-color: #07f8;
    border-radius: 10px;
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  height: 8vh;
  width: 100%;

  margin-bottom: 2vh;

  > button {
    height: 90%;
    width: 100%;
  }
`;

export const Separate = styled.div`
  width: 0.1vw;
  background-color: gray;
  margin: 0 1vw;
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
