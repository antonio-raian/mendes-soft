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
      background-color: #007fff1f;
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
    }

    td {
      padding: 20px 30px;
      border: 0;
      background: #fff;
      font-weight: 500;
      font-size: 18px;

      color: #1d1d1d;
    }

    td:first-child {
      border-radius: 5px 0 0 5px;
    }
    td:last-child {
      border-radius: 0 5px 5px 0;
    }
  }
`;
