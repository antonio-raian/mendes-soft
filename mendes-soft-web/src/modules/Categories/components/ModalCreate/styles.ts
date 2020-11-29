import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  padding: 30px;
  width: 90%;
  background-color: white;

  button {
    display: flex;
    margin-top: 20px;
    height: 10%;
    width: 15%;
    justify-content: space-evenly;
    align-items: center;
    text-align: left;
    background-color: #07f8;
    border-radius: 10px;
  }
`;
