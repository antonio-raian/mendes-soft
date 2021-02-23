import EmptyPage from "@/components/EmptyPage";
import Loading from "@/components/Loading";
import TableContainer from "@/components/TableContainer";
import TopLists from "@/components/TopLists";
import { MeasureUnit } from "@/interfaces";
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
  { id: "description", name: "Nome" },
  { id: "initials", name: "Sigla" },
];

const MeasureUnitList: React.FC = () => {
  const [searchBy, setSearchBy] = useState("id");
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  const [measures, setMesures] = useState<MeasureUnit[]>([]);

  const [selectable, setSelectable] = useState("");
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleLoad() {
      setLoading(true);
      const response = await api.get<MeasureUnit[]>("/measure_unit");

      setMesures(response.data);
      setLoading(false);
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

      <SecondLayout topTitle="Unidades de Medida">
        <Container>
          <TopLists>
            <button onClick={changeModalCreate}>Nova Unidade de Medida</button>

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
              {loading ? (
                <Loading />
              ) : measures.length <= 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={3}>
                      <EmptyPage />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {measures.map((cat) => (
                    <tr
                      onClick={() => {
                        setSelectable(cat.id);
                        changeModalDetails();
                      }}>
                      <td>{cat.id}</td>
                      <td>{cat.description}</td>
                      <td>{cat.initials}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </TableContainer>
        </Container>
      </SecondLayout>
    </>
  );
};

export default MeasureUnitList;
