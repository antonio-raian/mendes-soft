import React, { useCallback, useEffect, useRef, useState } from "react";

import * as Yup from "yup";

import Input from "@/components/Form/Input";
import Loading from "@/components/Loading";
import ModalComponent from "@/components/Modal";
import { useToast } from "@/hooks/toast";
import { Employee, Person } from "@/interfaces";
import api from "@/services/api";
import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";

import { Container, Box, BoxTitle } from "./styles";
import { getValidationErrors } from "@/utils/getValidationErrors";
import InputMask from "@/components/Form/InputMask";
import InputGroup from "@/components/InputGroup";
import validateDocument from "@/utils/validateDocument";
import { FiCheck } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  itemId: string;
}

const ModalUpdateEmployee: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  itemId,
}) => {
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();
  const [employee, setEmployee] = useState({} as Employee);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = async () => {
      try {
        setLoading(true);
        const response = await api.get<Employee[]>(`/employee?id=${itemId}`);
        console.log(response.data);
        setEmployee(response.data[0]);
        setLoading(false);
      } catch (e) {
        console.log("erro no update", e, e.response);
      }
    };
    isOpen && handleLoad();
  }, [isOpen, itemId]);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schope = Yup.object().shape({
          person: Yup.object().shape({
            name: Yup.string().required("Nome Obrigatório"),
            document: Yup.string().required("Documento Obrigatório"),
          }),
          user: Yup.object().shape({
            password: Yup.string(),
          }),
          employee: Yup.object().shape({
            comission: Yup.number(),
            salary: Yup.number().required("Salário Obrigatório"),
          }),
        });

        await schope.validate(data, {
          abortEarly: false,
        });

        await api.put<Person>("/person", {
          person: { id: employee.person.id, ...data.person },
        });

        await api.put<Employee>("/employee", {
          employee: { id: employee.id, ...data.employee },
        });
        await api.put("/user", {
          user: {
            id: employee.user.id,
            password: data.user.password ? data.user.password : undefined,
          },
        });

        toast.addToast({
          title: "Atualizado",
          type: "success",
          description: `Salvou ${data.person.name}`,
        });

        setIsOpen();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          toast.addToast({
            title: "Falha",
            type: "error",
            description: `${Object.values(errors)}`,
          });
          return;
        }
        console.log("erro ao salvar funcionário", error, error.response);

        toast.addToast({
          title: "Falha",
          type: "error",
          description: `${error.response}`,
        });
      }
    },
    [toast, setIsOpen, employee]
  );

  return (
    <ModalComponent
      title="Atualização Funcionário"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width={700}>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <Form
            initialData={{
              ...employee,
              person: {
                ...employee.person,
                document: employee.person.document,
              },
              employee: {
                comission: employee.comission,
                salary: employee.salary,
              },
            }}
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ width: "100%" }}>
            <Box>
              <BoxTitle>
                <span>1</span> Dados Pessoais{" "}
              </BoxTitle>
              <Scope path="person">
                <Input name="name" label="Nome:" />
                <InputMask
                  name="document"
                  label="CPF:"
                  mask="999.999.999-99"
                  onBlur={(e) => {
                    formRef.current?.setErrors({});
                    if (!validateDocument(e.target.value))
                      formRef.current?.setErrors({
                        person: { document: "CPF Inválido" },
                      });
                  }}
                />
              </Scope>
            </Box>
            <Box>
              <BoxTitle>
                <span>2</span> Dados Usuário{" "}
              </BoxTitle>
              <Scope path="user">
                <Input name="username" label="Usuário:" disabled />
                <Input name="password" label="Senha:" />
              </Scope>
            </Box>
            <Box>
              <BoxTitle>
                <span>3</span> Dados Funcionário{" "}
              </BoxTitle>
              <Scope path="employee">
                <InputGroup>
                  <Input name="salary" label="Salário:" type="number" />
                  <Input name="comission" label="Comissão:" type="number" />
                </InputGroup>
              </Scope>
            </Box>
            <div>
              <button type="submit">
                <FiCheck size={25} />
                Concluir
              </button>
            </div>
          </Form>
        )}
      </Container>
    </ModalComponent>
  );
};

export default ModalUpdateEmployee;
