import EmptyPage from "@/components/EmptyPage";
import Loading from "@/components/Loading";
import TableContainer from "@/components/TableContainer";
import TableFooter from "@/components/TableFooter";
import TopLists from "@/components/TopLists";
import { useAuth } from "@/hooks/auth";
import { Item, MetaListpaginated } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
import changeSearchBy from "@/utils/changeSearch";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import ModalDetails from "../../components/ModalDetails";
import { Container } from "./styles";

interface ItensPaginate {
  data: Item[];
  meta: MetaListpaginated;
}

const handle = [
  { id: "id", name: "Cód. Interno", style: { width: "10%" } },
  { id: "name", name: "Nome", style: { width: "40%" } },
  { id: "bar_code", name: "Cód. Barra", style: { width: "25%" } },
  { id: "category", name: "Categoria", style: { width: "25%" } },
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
  const [metaSearch, setMetaSearch] = useState({} as MetaListpaginated);
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  useEffect(() => {
    setLoading(true);
    async function handleLoad() {
      await api
        .get("/item?page=1")
        .then((response) => {
          setMetaSearch(response.data.meta);
          setProducts(response.data.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          if (e.response?.status === 401) {
            signOut();
            history.goBack();
          }
        });
    }
    async function handleLoadSearch() {
      await api
        .get<ItensPaginate>(
          `/item?${searchBy}=${
            searchBy === "id" ? searchData : `%${searchData}%`
          }&page=1`
        )
        .then((response) => {
          setMetaSearch(response.data.meta);
          setProducts(response.data.data.filter((i) => i.category));

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
  }, [modalDetails, searchBy, searchData, history, signOut]);

  const changeModal = useCallback(() => {
    setModalDetails((states) => !states);
  }, [setModalDetails]);

  const nextPage = async () => {
    setLoading(true);
    await api
      .get(`/item?page=${metaSearch.current_page + 1}`)
      .then((response) => {
        setMetaSearch(response.data.meta);
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response?.status === 401) {
          signOut();
          history.goBack();
        }
      });
  };

  const backPage = async () => {
    setLoading(true);
    await api
      .get(`/item?page=${metaSearch.current_page - 1}`)
      .then((response) => {
        setMetaSearch(response.data.meta);
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response?.status === 401) {
          signOut();
          history.goBack();
        }
      });
  };

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
                      onClick={() => changeSearchBy(h.id, setSearchBy, handle)}
                      style={h.style}>
                      {h.name}
                    </th>
                  ))}
                </tr>
              </thead>
              {loading ? (
                <Loading />
              ) : products.length <= 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={4}>
                      <EmptyPage />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {products.map((item) => (
                    <tr
                      onClick={() => {
                        setSelectable(item.id);
                        changeModal();
                      }}>
                      <td className={item.measure ? "" : "incomplete"}>
                        {item.id}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.bar_code}</td>
                      <td>{item.category.name} </td>
                    </tr>
                  ))}
                </tbody>
              )}
              <TableFooter
                meta={metaSearch}
                actionNext={nextPage}
                actionBack={backPage}
              />
            </table>
          </TableContainer>
        </Container>
      </SecondLayout>
    </>
  );
};

export default ProductList;
