import EmptyPage from "@/components/EmptyPage";
import Loading from "@/components/Loading";
import TableContainer from "@/components/TableContainer";
import TopLists from "@/components/TopLists";
import { useAuth } from "@/hooks/auth";
import { Purchase } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
import changeSearchBy from "@/utils/changeSearch";
import { Status } from "@/utils/prefixedData";
import { format, parseISO } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Container } from "./styles";

const handle = [
  { id: "id", name: "Cód. Interno" },
  { id: "create_at", name: "Data" },
  { id: "employee_id", name: "Funcionário" },
  { id: "value", name: "Valor" },
  { id: "status", name: "Situação" },
];

const PurchaseList: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchBy, setSearchBy] = useState("id");
  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  useEffect(() => {
    setLoading(true);
    async function handleLoad() {
      await api
        .get("/purchase")
        .then((resPurch) => {
          setPurchases(resPurch.data);
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

  const toDetailsPage = useCallback((itemId) => {
    history.push("/compras/detalhes", { itemId });
  }, []);

  return (
    <SecondLayout topTitle="Compras">
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <TopLists>
            <button onClick={() => history.push("/compras/cadastro")}>
              Nova Compra
            </button>
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
          {purchases.length <= 0 ? (
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
                  {purchases.map((purc) => (
                    <tr
                      onClick={() => {
                        toDetailsPage(purc.id);
                      }}>
                      <td>{purc.id}</td>
                      <td>{format(parseISO(purc.created_at), "dd/MM/yyyy")}</td>
                      <td>{purc.employee.person.name}</td>
                      <td>{purc.value} </td>
                      <td>
                        {Status.find((s) => s.value === purc.status)?.label}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
          )}
        </Container>
      )}
    </SecondLayout>
  );
};

export default PurchaseList;
