import EmptyPage from "@/components/EmptyPage";
import Loading from "@/components/Loading";
import TableContainer from "@/components/TableContainer";
import TableFooter from "@/components/TableFooter";
import TopLists from "@/components/TopLists";
import { useAuth } from "@/hooks/auth";
import { MetaListpaginated, Sale } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
import changeSearchBy from "@/utils/changeSearch";
import { FormPayment, Status } from "@/utils/prefixedData";
import { format, parseISO } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Container } from "./styles";

const handle = [
  { id: "id", name: "Cód. Interno" },
  { id: "create_at", name: "Data" },
  { id: "form_payment", name: "Forma de Pagamento" },
  { id: "value", name: "Valor" },
  { id: "status", name: "Situação" },
];

interface ItensPaginate {
  data: Sale[];
  meta: MetaListpaginated;
}

const SaleList: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [sales, setSales] = useState<Sale[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchBy, setSearchBy] = useState("id");

  const [metaSearch, setMetaSearch] = useState({} as MetaListpaginated);
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  useEffect(() => {
    setLoading(true);
    async function handleLoad() {
      await api
        .get<ItensPaginate>("/sale?page=1")
        .then((resSale) => {
          setMetaSearch(resSale.data.meta);
          setSales(resSale.data.data);
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
  }, [history, signOut]);

  const toDetailsPage = useCallback(
    (itemId) => {
      history.push("/vendas/detalhes", { itemId });
    },
    [history]
  );

  const nextPage = async () => {
    setLoading(true);
    await api
      .get(`/sale?page=${metaSearch.current_page + 1}`)
      .then((response) => {
        setMetaSearch(response.data.meta);
        setSales(response.data.data);
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
      .get(`/sale?page=${metaSearch.current_page - 1}`)
      .then((response) => {
        setMetaSearch(response.data.meta);
        setSales(response.data.data);
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
    <SecondLayout topTitle="Vendas">
      <Container>
        <TopLists>
          <button onClick={() => history.push("/vendas/cadastro")}>
            Nova Venda
          </button>
          {/* <div>
            <FiSearch size={20} />
            <input
              placeholder={`Buscar por ${
                handle.find((h) => h.id === searchBy)?.name
              }`}
              name="search"
            />
          </div> */}
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
            ) : sales.length <= 0 ? (
              <tbody>
                <tr>
                  <td colSpan={5}>
                    <EmptyPage />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {sales.map((sale) => (
                  <tr
                    onClick={() => {
                      toDetailsPage(sale.id);
                    }}>
                    <td>{sale.id}</td>
                    <td>{format(parseISO(sale.created_at), "dd/MM/yyyy")}</td>
                    <td>
                      {
                        FormPayment.find((f) => f.value === sale.form_payment)
                          ?.label
                      }
                    </td>
                    <td>{sale.net_value} </td>
                    <td>
                      {Status.find((s) => s.value === sale.status)?.label}{" "}
                    </td>
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
  );
};

export default SaleList;
