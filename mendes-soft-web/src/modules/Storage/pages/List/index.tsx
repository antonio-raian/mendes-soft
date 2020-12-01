import TableContainer from "@/components/TableContainer";
import TopLists from "@/components/TopLists";
import { useAuth } from "@/hooks/auth";
import { Item, Storage } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
import changeSearchBy from "@/utils/changeSearch";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import ModalDetails from "../../components/ModalDetails";
import { Container } from "./styles";

const handle = [
  { id: "bar_code", name: "Cód. Barra" },
  { id: "name", name: "Nome" },
  { id: "value_sale", name: "Valor de Venda" },
  { id: "quantity", name: "Quantidade" },
];

const StorageList: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [storages, setStorage] = useState<Storage[]>();

  const [selectable, setSelectable] = useState("");
  const [modalDetails, setModalDetails] = useState(false);

  const [searchBy, setSearchBy] = useState("bar_code");
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  useEffect(() => {
    async function handleLoad() {
      await api
        .get<Item[]>(`/item?${searchBy}=%${searchData}%`)
        .then((response) => {
          setStorage(
            response.data.map((item) => ({ ...item.storage, item: item }))
          );
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response?.status === 401) {
            signOut();
            history.goBack();
          }
        });
    }
    handleLoad();
  }, [searchData, searchBy]);

  useEffect(() => {
    async function handleLoad() {
      await api
        .get("/storage")
        .then((response) => {
          setStorage(response.data);
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response?.status === 401) {
            signOut();
            history.goBack();
          }
        });
    }
    handleLoad();
  }, [modalDetails]);

  const changeModal = useCallback(() => {
    setModalDetails((states) => !states);
  }, [setModalDetails]);

  return (
    <SecondLayout topTitle="Estoque">
      <ModalDetails
        isOpen={modalDetails}
        setIsOpen={changeModal}
        itemId={selectable}
      />

      <Container>
        <TopLists containerStyle={{ justifyContent: "flex-end" }}>
          <div>
            <FiSearch size={20} />
            <input
              placeholder={`Buscar por ${
                handle.find((h) => h.id === searchBy)?.name
              }`}
              name="search"
              onChange={(e) => setSearchData(e.target.value)}
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
              {storages?.map((stock) => (
                <tr
                  onClick={() => {
                    setSelectable(stock.id);
                    changeModal();
                  }}>
                  <td>{stock.item.bar_code}</td>
                  <td>{stock.item.name}</td>
                  <td>R$ {stock.value_sale.toFixed(2)}</td>
                  <td>{stock.quantity} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </SecondLayout>
  );
};

export default StorageList;
