import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;

  button {
    display: flex;
    margin-top: 20px;
    height: 7vh;
    width: 25%;
    justify-content: space-evenly;
    align-items: center;
    text-align: left;
    background-color: #07f8;
    border-radius: 5px;
  }
`;

export const Box = styled.section`
  margin: 5px;
`;

export const BoxTitle = styled.strong`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  > span {
    padding: 10px 14px;
    background-color: #07f;
    color: white;
    border-radius: 50px;
    margin-right: 10px;
  }
`;
