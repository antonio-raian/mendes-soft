import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "@/components/TableContainer";
import TopLists from "@/components/TopLists";
import EmptyPage from "@/components/EmptyPage";
import { useAuth } from "@/hooks/auth";
import { Item, Storage } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
import changeSearchBy from "@/utils/changeSearch";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import ModalDetails from "../../components/ModalDetails";
import { Container } from "./styles";
import Loading from "@/components/Loading";

const handle = [
  { id: "bar_code", name: "Cód. Barra" },
  { id: "name", name: "Nome" },
  { id: "value_sale", name: "Valor de Venda" },
  { id: "quantity", name: "Quantidade" },
];

const StorageList: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [storages, setStorage] = useState<Storage[]>([]);

  const [selectable, setSelectable] = useState("");
  const [modalDetails, setModalDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchBy, setSearchBy] = useState("bar_code");
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  const searchFunction = useCallback(async () => {
    setLoading(true);
    await api
      .get<Item[]>(`/item?${searchBy}=%${searchData}%`)
      .then((response) => {
        setStorage(
          response.data.map((item) => ({ ...item.storage, item: item }))
        );
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response?.status === 401) {
          signOut();
          history.goBack();
        }
      });
  }, [searchData, searchBy]);

  useEffect(() => {
    setLoading(true);
    async function handleLoad() {
      await api
        .get("/storage")
        .then((response) => {
          setStorage(response.data);
          setLoading(false);
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
    <>
      <ModalDetails
        isOpen={modalDetails}
        setIsOpen={changeModal}
        itemId={selectable}
      />

      <SecondLayout topTitle="Estoque">
        <Container>
          <TopLists containerStyle={{ justifyContent: "flex-end" }}>
            <div>
              <FiSearch size={20} />
              <input
                placeholder={`Buscar por ${
                  handle.find((h) => h.id === searchBy)?.name
                }`}
                name="search"
                onChange={(e) => {
                  setSearchData(e.target.value);
                  searchFunction();
                }}
              />
            </div>
          </TopLists>
          {storages.length <= 0 ? (
            <EmptyPage />
          ) : (
            <TableContainer>
              <table>
                <thead>
                  <tr>
                    {handle.map((h) => (
                      <th
                        id={h.id}
                        onClick={() =>
                          changeSearchBy(h.id, setSearchBy, handle)
                        }>
                        {h.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                {loading ? (
                  <Loading />
                ) : (
                  <tbody>
                    {storages.map((stock) => (
                      <tr
                        onClick={() => {
                          setSelectable(stock?.id);
                          changeModal();
                        }}>
                        <td>{stock?.item.bar_code}</td>
                        <td>{stock?.item.name}</td>
                        <td>R$ {stock?.value_sale.toFixed(2)}</td>
                        <td>{stock?.quantity} </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </TableContainer>
          )}
        </Container>
      </SecondLayout>
    </>
  );
};

export default StorageList;
