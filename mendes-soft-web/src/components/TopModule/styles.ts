import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 10%;
  width: 100%;
  background-color: #007fff11;
  align-items: center;
`;

export const Back = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
`;

export const Logo = styled.div`
  display: flex;
  width: 40%;
  justify-content: flex-end;
  img {
    width: 18%;
  }
`;

export const Title = styled.div`
  display: flex;
  width: 90%;
  align-items: center;

  text-transform: uppercase;

  span {
    padding: 0 20px;
  }
`;
