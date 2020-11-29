import TableContainer from "@/components/TableContainer";
import SecondLayout from "@/layouts/SecondLayout";
import React, { useCallback, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ModalDetailsProduct from "../../components/ModalDetails";
import { Buttons, Container } from "./styles";

const CategoryList: React.FC = () => {
  const [selectable, setSelectable] = useState("");
  const [modalDetails, setModalDetails] = useState(false);

  const changeModal = useCallback(() => {
    setModalDetails((states) => !states);
  }, [setModalDetails]);

  return (
    <SecondLayout topTitle="Categorias">
      <ModalDetailsProduct
        isOpen={modalDetails}
        setIsOpen={changeModal}
        itemId={selectable}
      />

      <Container>
        <Buttons>
          <button onClick={() => {}}>Nova Categoria</button>
          <div>
            <FiSearch size={20} />
            <input placeholder="Buscar" name="search" />
          </div>
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
              <tr
                onClick={() => {
                  setSelectable("1");
                  changeModal();
                }}>
                <td>1</td>
                <td>Remédio</td>
                <td>123123123</td>
                <td>Categoria </td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </SecondLayout>
  );
};

export default CategoryList;
