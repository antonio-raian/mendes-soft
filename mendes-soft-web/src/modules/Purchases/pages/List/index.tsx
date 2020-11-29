import TableContainer from "@/components/TableContainer";
import SecondLayout from "@/layouts/SecondLayout";
import React, { useCallback, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import ModalDetails from "../../components/ModalDetails";
import { Buttons, Container } from "./styles";

const PurchaseList: React.FC = () => {
  const history = useHistory();

  const [selectable, setSelectable] = useState("");
  const [modalDetails, setModalDetails] = useState(false);

  const changeModal = useCallback(() => {
    setModalDetails((states) => !states);
  }, [setModalDetails]);

  return (
    <SecondLayout topTitle="Compras">
      <ModalDetails
        isOpen={modalDetails}
        setIsOpen={changeModal}
        itemId={selectable}
      />

      <Container>
        <Buttons>
          <button onClick={() => history.push("/compras/cadastro")}>
            Nova Compra
          </button>
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

export default PurchaseList;
