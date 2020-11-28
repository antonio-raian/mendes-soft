import TableContainer from "@/components/TableContainer";
import TopModule from "@/components/TopModule";
import React from "react";
import { Buttons, Container } from "./styles";

const CategoryList: React.FC = () => {
  return (
    <Container>
      <TopModule title="Categorias" />
      <Buttons>
        <button>Cadastrar Categoria</button>
      </Buttons>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Categoria</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default CategoryList;
