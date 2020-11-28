import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 0 20px;
  background-color: white;
  height: 10vh;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 25%;
  img {
    width: 65%;
  }
`;

export const Hour = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  width: 25%;
  height: 70%;
  button {
    border-radius: 50px;
    width: 15%;
    color: #007fff;
    border-style: none;
    background-color: transparent;
  }
  > button :hover {
    border-radius: 50px;
    width: 50%;
    height: 50%;
    color: white;
    background-color: #007fff;
  }
`;
