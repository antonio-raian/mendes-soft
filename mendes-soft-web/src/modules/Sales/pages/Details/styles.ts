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

    button {
      margin: 0 1vw;
      background-color: #7d7;
      padding: 0.5vw;
      border-radius: 5px;
    }
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  height: 8vh;
  width: 100%;

  margin-bottom: 2vh;

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
`;

export const Separate = styled.div`
  width: 0.1vw;
  background-color: gray;
  margin: 0 1vw;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    margin: 5px 0;
  }
  span {
    &.paid {
      color: green;
    }
    &.pending {
      color: red;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  button {
    display: flex;
    width: 45%;
    height: 5vh;
    text-transform: uppercase;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 5px;

    &.edit {
      color: #ddd;
      background-color: #07f;
    }
    &.save {
      background-color: #7d7;
    }
  }
`;
