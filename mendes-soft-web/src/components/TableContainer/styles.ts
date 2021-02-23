import styled from "styled-components";

export const Container = styled.section`
  width: 90%;
  table {
    width: 100%;
    border-spacing: 0px 10px;

    th {
      padding: 10px 20px;
      text-align: left;
      font-weight: 500;
      font-size: 18px;
      background-color: #07f3;

      &:hover {
        background-color: #07f5;
      }

      &:active {
        background-color: #07f7;
      }
    }
    .selected {
      background-color: #07f7;
    }

    tbody {
      tr {
        flex: 1;
        transition: transform 0.5s;

        &:hover {
          transform: translateX(5px);
          cursor: pointer;
        }
      }
      .incomplete {
        border: 2px solid red;
      }
    }

    td {
      padding: 15px 30px;
      border-bottom: 2px solid #eee;
      background: #fff;
      font-weight: 500;
      font-size: 18px;

      color: #1d1d1d;
    }
  }
`;
