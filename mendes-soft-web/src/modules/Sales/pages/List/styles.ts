import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 85vh;
  background-color: white;
`;

export const Buttons = styled.div`
  display: flex;
  height: 10%;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input {
    margin: 0 10px;
  }
`;
