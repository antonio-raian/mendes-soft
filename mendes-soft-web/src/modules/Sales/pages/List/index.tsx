import TableContainer from "@/components/TableContainer";
import TopLists from "@/components/TopLists";
import SecondLayout from "@/layouts/SecondLayout";
import changeSearchBy from "@/utils/changeSearch";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import ModalDetails from "../../components/ModalDetails";
import { Container } from "./styles";

const handle = [
  { id: "id", name: "Cód. Interno" },
  { id: "creatAt", name: "Data" },
  { id: "user", name: "Funcionário" },
  { id: "value", name: "Valor" },
];

const SaleList: React.FC = () => {
  const history = useHistory();

  const [selectable, setSelectable] = useState("");
  const [modalDetails, setModalDetails] = useState(false);

  const [searchBy, setSearchBy] = useState("id");
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  const changeModal = useCallback(() => {
    setModalDetails((states) => !states);
  }, [setModalDetails]);

  return (
    <SecondLayout topTitle="Vendas">
      <ModalDetails
        isOpen={modalDetails}
        setIsOpen={changeModal}
        itemId={selectable}
      />

      <Container>
        <TopLists>
          <button onClick={() => history.push("/vendas/cadastro")}>
            Nova Venda
          </button>
          <div>
            <FiSearch size={20} />
            <input
              placeholder={`Buscar por ${
                handle.find((h) => h.id === searchBy)?.name
              }`}
              name="search"
            />
          </div>
        </TopLists>
        <TableContainer>
          <table>
            <thead>
              <tr>
                {handle.map((h) => (
                  <th
                    id={h.id}
                    onClick={() => changeSearchBy(h.id, setSearchBy, handle)}>
                    {h.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr
                onClick={() => {
                  setSelectable("1");
                  changeModal();
                }}>
                <td>1</td>
                <td>21/10/2020</td>
                <td>Altierre</td>
                <td>R$ 100,00 </td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </SecondLayout>
  );
};

export default SaleList;
