import TableContainer from "@/components/TableContainer";
import SecondLayout from "@/layouts/SecondLayout";
import React, { useCallback, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ModalCreateCategory from "../../components/ModalCreate";
import ModalDetailsCategory from "../../components/ModalDetails";
import { Buttons, Container } from "./styles";

const CategoryList: React.FC = () => {
  const [selectable, setSelectable] = useState("");
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);

  const changeModalDetails = useCallback(() => {
    setModalDetails((states) => !states);
  }, [setModalDetails]);

  const changeModalCreate = useCallback(() => {
    setModalCreate((states) => !states);
  }, [setModalCreate]);

  return (
    <SecondLayout topTitle="Categorias">
      <ModalCreateCategory isOpen={modalCreate} setIsOpen={changeModalCreate} />

      <ModalDetailsCategory
        isOpen={modalDetails}
        setIsOpen={changeModalDetails}
        itemId={selectable}
      />

      <Container>
        <Buttons>
          <button onClick={changeModalCreate}>Nova Categoria</button>
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
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr
                onClick={() => {
                  setSelectable("1");
                  changeModalDetails();
                }}>
                <td>1</td>
                <td>Remédio</td>
                <td>123123123</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </SecondLayout>
  );
};

export default CategoryList;
