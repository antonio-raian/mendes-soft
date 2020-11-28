import TableContainer from "@/components/TableContainer";
import TopModule from "@/components/TopModule";
import React from "react";
import { Buttons, Container } from "./styles";

const SalesList: React.FC = () => {
  return (
    <Container>
      <TopModule title="Vendas" />
      <Buttons>
        <button>Nova Venda</button>
      </Buttons>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Cód. Interno</th>
              <th>Nome</th>
              <th>Cód. Barra</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Remédio</td>
              <td>123123123</td>
              <td>Categoria </td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default SalesList;
