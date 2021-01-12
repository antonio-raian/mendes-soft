import EmptyPage from "@/components/EmptyPage";
import Loading from "@/components/Loading";
import TableContainer from "@/components/TableContainer";
import TableFooter from "@/components/TableFooter";
import TopLists from "@/components/TopLists";
import { useAuth } from "@/hooks/auth";
import { Employee, MetaListpaginated } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
import changeSearchBy from "@/utils/changeSearch";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Container } from "./styles";

interface ItensPaginate {
  data: Employee[];
  meta: MetaListpaginated;
}

const handle = [
  { id: "id", name: "Cód. Interno", style: {} },
  { id: "name", name: "Nome", style: {} },
  { id: "username", name: "Usuário", style: {} },
  { id: "active", name: "Status", style: {} },
];

const EmployeeList: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchBy, setSearchBy] = useState("name");
  const [searchData, setSearchData] = useState("");
  const [metaSearch, setMetaSearch] = useState({} as MetaListpaginated);

  useEffect(() => {
    setLoading(true);
    async function handleLoad() {
      await api
        .get("/employee?page=1")
        .then((response) => {
          setMetaSearch(response.data.meta);
          setEmployees(response.data.data);
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
          `/employee?${searchBy}=${
            searchBy === "id" ? searchData : `%${searchData}%`
          }&page=1`
        )
        .then((response) => {
          setMetaSearch(response.data.meta);
          setEmployees(response.data.data);

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
  }, [searchBy, searchData, history, signOut]);

  useEffect(() => {
    changeSearchBy(searchBy, setSearchBy, handle);
  }, [searchBy]);

  const redirectToDetails = useCallback(
    (id) => {
      history.push("/funcionarios/detalhes", { employeeId: id });
    },
    [history]
  );

  const nextPage = async () => {
    setLoading(true);
    await api
      .get(`/employee?page=${metaSearch.current_page + 1}`)
      .then((response) => {
        setMetaSearch(response.data.meta);
        setEmployees(response.data.data);
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
      .get(`/employee?page=${metaSearch.current_page - 1}`)
      .then((response) => {
        setMetaSearch(response.data.meta);
        setEmployees(response.data.data);
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
    <SecondLayout topTitle="Funcionários">
      <Container>
        <TopLists>
          <button onClick={() => history.push("/funcionarios/cadastro")}>
            Novo Funcionário
          </button>
          <div>
            <FiSearch size={20} />
            <input
              placeholder={`Buscar por ${
                handle.find((h) => h.id === searchBy)?.name
              }`}
              onChange={(e) => setSearchData(e.target.value)}
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
                    onClick={() => changeSearchBy(h.id, setSearchBy, handle)}
                    style={h.style}>
                    {h.name}
                  </th>
                ))}
              </tr>
            </thead>
            {loading ? (
              <Loading />
            ) : employees.length <= 0 ? (
              <tbody>
                <tr>
                  <td colSpan={4}>
                    <EmptyPage />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {employees.map((employee) => (
                  <tr
                    onClick={() => {
                      redirectToDetails(employee.id);
                    }}>
                    <td>{employee.id}</td>
                    <td>{employee.person.name}</td>
                    <td>{employee.user.username}</td>
                    <td>{employee.active ? "Ativo" : "Inativo"} </td>
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

export default EmployeeList;
