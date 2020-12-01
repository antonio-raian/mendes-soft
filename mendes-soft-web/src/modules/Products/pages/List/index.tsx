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

  const searchFunction = useCallback(async () => {
    setLoading(true);
    await api
      .get(`/item?${searchBy}=%${searchData}%`)
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
  }, [searchData, searchBy]);

  useEffect(() => {
    async function handleLoad() {
      setLoading(true);
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
      <SecondLayout topTitle="Produtos">
        {loading ? (
          <Loading />
        ) : (
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
                  onChange={(e) => {
                    setSearchData(e.target.value);
                    searchFunction();
                  }}
                />
              </div>
            </TopLists>
            {products.length <= 0 ? (
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
                  <tbody>
                    {products.map(
                      (item) =>
                        item.category && (
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
                        )
                    )}
                  </tbody>
                </table>
              </TableContainer>
            )}
          </Container>
        )}
      </SecondLayout>
    </>
  );
};

export default ProductList;
