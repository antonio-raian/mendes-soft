import EmptyPage from "@/components/EmptyPage";
import Loading from "@/components/Loading";
import TableContainer from "@/components/TableContainer";
import TableFooter from "@/components/TableFooter";
import TopLists from "@/components/TopLists";
import { useAuth } from "@/hooks/auth";
import { MetaListpaginated, Purchase } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
import changeSearchBy from "@/utils/changeSearch";
import { Status } from "@/utils/prefixedData";
import { format, parseISO } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "./styles";

const handle = [
  { id: "id", name: "Cód. Interno" },
  { id: "create_at", name: "Data" },
  { id: "employee_id", name: "Funcionário" },
  { id: "value", name: "Valor" },
  { id: "status", name: "Situação" },
];

interface ItensPaginate {
  data: Purchase[];
  meta: MetaListpaginated;
}

const PurchaseList: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const [loading, setLoading] = useState(true);
  const [metaSearch, setMetaSearch] = useState({} as MetaListpaginated);
  const [searchBy, setSearchBy] = useState("id");
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  useEffect(() => {
    setLoading(true);
    async function handleLoad() {
      await api
        .get<ItensPaginate>("/purchase?page=1")
        .then((resPurch) => {
          setMetaSearch(resPurch.data.meta);
          setPurchases(resPurch.data.data);
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
      history.push("/compras/detalhes", { itemId });
    },
    [history]
  );

  const nextPage = async () => {
    setLoading(true);
    await api
      .get(`/purchase?page=${metaSearch.current_page + 1}`)
      .then((response) => {
        setMetaSearch(response.data.meta);
        setPurchases(response.data.data);
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

  const goToPage = async (value: number) => {
    setLoading(true);
    await api
      .get(`/purchase?page=${value}`)
      .then((response) => {
        setMetaSearch(response.data.meta);
        setPurchases(response.data.data);
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
      .get(`/purchase?page=${metaSearch.current_page - 1}`)
      .then((response) => {
        setMetaSearch(response.data.meta);
        setPurchases(response.data.data);
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
    <SecondLayout topTitle="Compras">
      <Container>
        <TopLists>
          <button onClick={() => history.push("/compras/cadastro")}>
            Nova Compra
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
            ) : purchases.length <= 0 ? (
              <tbody>
                <tr>
                  <td colSpan={5}>
                    <EmptyPage />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {purchases.map((purc) => (
                  <tr
                    onClick={() => {
                      toDetailsPage(purc.id);
                    }}>
                    <td>{purc.id}</td>
                    <td>
                      {format(
                        parseISO(purc.expected_payment_date),
                        "dd/MM/yyyy"
                      )}
                    </td>
                    <td>{purc.employee.person.name}</td>
                    <td>{purc.value} </td>
                    <td>
                      {Status.find((s) => s.value === purc.status)?.label}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            <TableFooter
              meta={metaSearch}
              actionNext={nextPage}
              goToAction={goToPage}
              actionBack={backPage}
            />
          </table>
        </TableContainer>
      </Container>
    </SecondLayout>
  );
};

export default PurchaseList;
