import Loading from "@/components/Loading";
import ModalDelete from "@/components/ModalDelete";
import TableContainer from "@/components/TableContainer";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import { Employee, User } from "@/interfaces";
import SecondLayout from "@/layouts/SecondLayout";
import { Separate } from "@/modules/Purchases/pages/Create/styles";
import api from "@/services/api";
import React, { useCallback, useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom";
import ModalUpdateEmployee from "../../components/ModalUpdate";
import { Container, ContentLeft, ContentRight } from "./styles";

interface State {
  employeeId: number | string;
}

const EmployeeDetails: React.FC = () => {
  const history = useHistory();

  const toast = useToast();
  const { signOut } = useAuth();
  const { state } = useLocation<State>();

  const [employee, setEmployee] = useState({} as Employee);

  const [loading, setLoading] = useState(true);

  const [modalDelete, setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const [user, setUser] = useState({} as User);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("@mendes-soft:user") || ""));
  }, []);

  useEffect(() => {
    async function handleLoad() {
      setLoading(true);
      await api
        .get<Employee[]>(`/employee?id=${state.employeeId}`)
        .then(async (resProd) => {
          setEmployee(resProd.data[0]);
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response?.status === 401) {
            signOut();
            history.goBack();
          }
        });
      setLoading(false);
    }
    handleLoad();
  }, [history, state, signOut, modalUpdate]);

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`/user/${employee.user.id}`).then(async (res) => {
        await api.delete(`/employee/${employee.id}`);
        await api.delete(`/person/${employee.person.id}`);
      });

      toast.addToast({
        title: "Removido",
        type: "success",
        description: `Funcionário ${employee.person.name} removido com sucesso`,
      });

      setModalDelete(false);
      history.goBack();
    } catch (e) {
      console.log("Erro ao deletar funcionário", e, e.response);
      toast.addToast({
        title: "Erro",
        type: "error",
        description: "Erro ao remover o Funcionário",
      });
    }
  }, [employee, toast, history]);

  return (
    <>
      <SecondLayout topTitle="Funcionário">
        {loading ? (
          <Loading />
        ) : (
          <Container>
            <ContentLeft>
              <div>
                <h2>Dados Pessoais</h2>
                <span>
                  <strong>Nome: </strong>
                  {employee.person.name}
                </span>
                <span>
                  <strong>Documento: </strong>
                  {employee.person.document}
                </span>
              </div>
              <div>
                <h2>Dados de Acesso</h2>
                <span>
                  <strong>Usuário: </strong>
                  {employee.user.username}
                </span>
                <span>
                  <strong>Status: </strong>
                  {employee.user.active ? "Ativo" : "Inativo"}
                </span>
              </div>
              <div>
                <h2>Dados de Funcionário</h2>
                <span>
                  <strong>Salário: </strong>
                  R$ {employee.salary.toFixed(2)}
                </span>
                <span>
                  <strong>Comissão: </strong>
                  {employee.comission}%
                </span>
              </div>
              <section>
                <button onClick={() => setModalUpdate((state) => !state)}>
                  <FiEdit size={30} />
                  Editar
                </button>
                {employee.user.id !== user.id && (
                  <button
                    className="delete"
                    onClick={() => setModalDelete((state) => !state)}>
                    <FiTrash size={30} />
                    Excluir
                  </button>
                )}
              </section>
            </ContentLeft>
            <Separate />
            <ContentRight>
              <div>
                <section>
                  <h2>Endereços</h2>
                  <button>
                    <FiPlus size={20} />
                    Adicionar Endereço
                  </button>
                </section>
                <TableContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>CEP</th>
                        <th>Logradouro</th>
                        <th>Número</th>
                        <th>Cidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee.person?.addresses.map((address) => (
                        <tr>
                          <td>{address.cep}</td>
                          <td>{address.public_name}</td>
                          <td>{address.number}</td>
                          <td>{address.city}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableContainer>
              </div>
              <div>
                <section>
                  <h2>Contatos</h2>
                  <button>
                    <FiPlus size={20} />
                    Adicionar Contato
                  </button>
                </section>
                <TableContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>Telefone</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee.person?.contacts.map((contact) => (
                        <tr>
                          <td>{contact.email}</td>
                          <td>{contact.celphone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableContainer>
              </div>
            </ContentRight>
          </Container>
        )}
      </SecondLayout>

      {/* Modal Update */}
      <ModalUpdateEmployee
        isOpen={modalUpdate}
        setIsOpen={() => setModalUpdate((state) => !state)}
        itemId={employee?.id}
      />

      {/* Modal Delete */}
      <ModalDelete
        title="Remover Funcionário"
        modelName={employee?.user?.username}
        isOpen={modalDelete}
        setIsOpen={() => setModalDelete((state) => !state)}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default EmployeeDetails;
