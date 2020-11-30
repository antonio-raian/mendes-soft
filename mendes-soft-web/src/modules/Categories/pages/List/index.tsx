import TableContainer from "@/components/TableContainer";
import TopLists from "@/components/TopLists";
import { Category } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
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
  const [searchBy, setSearchBy] = useState("id");
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [selectable, setSelectable] = useState("");
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);

  useEffect(() => {
    async function handleLoad() {
      const response = await api.get<Category[]>("/category");

      setCategories(response.data);
    }
    handleLoad();
  }, [modalCreate, modalDetails]);

  const changeModalDetails = useCallback(() => {
    setModalDetails((states) => !states);
  }, []);

  const changeModalCreate = useCallback(() => {
    setModalCreate((states) => !states);
  }, []);

  return (
    <>
      <ModalCreateCategory isOpen={modalCreate} setIsOpen={changeModalCreate} />

      <ModalDetailsCategory
        isOpen={modalDetails}
        setIsOpen={changeModalDetails}
        itemId={selectable}
      />

      <SecondLayout topTitle="Categorias">
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
                {categories.map((cat) => (
                  <tr
                    onClick={() => {
                      setSelectable(cat.id);
                      changeModalDetails();
                    }}>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </Container>
      </SecondLayout>
    </>
  );
};

export default CategoryList;
