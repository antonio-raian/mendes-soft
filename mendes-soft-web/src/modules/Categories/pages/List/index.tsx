import TableContainer from "@/components/TableContainer";
import TopLists from "@/components/TopLists";
import SecondLayout from "@/layouts/SecondLayout";
import changeSearchBy from "@/utils/changeSearch";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ModalCreateCategory from "../../components/ModalCreate";
import ModalDetailsCategory from "../../components/ModalDetails";
import { Container } from "./styles";

const handle = [
  { id: "id", name: "Cód. Interno" },
  { id: "name", name: "Nome" },
  { id: "description", name: "Descrição" },
];

const CategoryList: React.FC = () => {
  const [selectable, setSelectable] = useState("");
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);

  const [searchBy, setSearchBy] = useState("id");
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

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
        <TopLists>
          <button onClick={changeModalCreate}>Nova Categoria</button>

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
