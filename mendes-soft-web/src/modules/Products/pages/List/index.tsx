import EmptyPage from "@/components/EmptyPage";
import Loading from "@/components/Loading";
import TableContainer from "@/components/TableContainer";
import TopLists from "@/components/TopLists";
import { useAuth } from "@/hooks/auth";
import { Item } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
import changeSearchBy from "@/utils/changeSearch";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import ModalDetails from "../../components/ModalDetails";
import { Container } from "./styles";

const handle = [
  { id: "id", name: "Cód. Interno" },
  { id: "name", name: "Nome" },
  { id: "bar_code", name: "Cód. Barra" },
  { id: "category", name: "Categoria" },
];

const ProductList: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [products, setProducts] = useState<Item[]>([]);

  const [selectable, setSelectable] = useState("");
  const [modalDetails, setModalDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchBy, setSearchBy] = useState("name");
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  useEffect(() => {
    setLoading(true);
    async function handleLoad() {
      await api
        .get("/item")
        .then((response) => {
          setProducts(response.data);
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
    async function handleLoadSearch() {
      await api
        .get<Item[]>(
          `/item?${searchBy}=${
            searchBy === "id" ? searchData : `%${searchData}%`
          }`
        )
        .then((response) => {
          setProducts(response.data.filter((i) => i.category));

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
    searchData ? handleLoadSearch() : handleLoad();
  }, [modalDetails, searchBy, searchData]);

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
      <SecondLayout topTitle="Produtos">
        <Container>
          <TopLists>
            <button onClick={() => history.push("/produtos/cadastro")}>
              Cadastrar Produto
            </button>
            <div>
              <FiSearch size={20} />
              <input
                placeholder={`Buscar por ${
                  handle.find((h) => h.id === searchBy)?.name
                }`}
                name="search"
                value={searchData}
                onChange={(e) => {
                  setSearchData(e.target.value);
                }}
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
              ) : products.length <= 0 ? (
                <tbody>
                  <td></td>
                  <td>
                    <EmptyPage
                      search={searchData}
                      model={handle.find((h) => h.id === searchBy)?.name}
                    />
                  </td>
                </tbody>
              ) : (
                <tbody>
                  {products.map((item) => (
                    <tr
                      onClick={() => {
                        setSelectable(item.id);
                        changeModal();
                      }}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.bar_code}</td>
                      <td>{item.category.name} </td>
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

export default ProductList;
