import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 10px 30px;
  width: 90%;
  background-color: white;

  button {
    display: flex;
    margin-top: 20px;
    height: 7vh;
    width: 15%;
    justify-content: space-evenly;
    align-items: center;
    text-align: left;
    background-color: #07f8;
    border-radius: 10px;
  }
`;

export const Content = styled.section`
  display: flex;
`;

export const ContentLeft = styled.section`
  width: 45%;
  height: 90%;
`;

export const ContentRight = styled.section`
  width: 55%;
  height: 90%;
`;

export const Box = styled.section`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
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
