import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 10vh;
  width: 100%;
  background-color: #007fff11;
  align-items: center;
  justify-content: center;
`;

export const Back = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  img {
    width: 18%;
  }
`;

export const Title = styled.div`
  display: flex;
  width: 50%;
  align-items: center;

  text-transform: uppercase;
  font-weight: 700;

  span {
    padding: 0 20px;
    width: 20%;
  }
`;
