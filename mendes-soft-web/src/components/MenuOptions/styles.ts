import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 16px;

  a {
    text-decoration: none;
    min-width: 300px;
    height: 150px;
    background: white;
    border-radius: 10px;
    border: 2px solid #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: 500;
    font-size: 18px;
    text-transform: uppercase;
    color: black;

    &:hover {
      border-color: #007fff;
    }
  }
`;
