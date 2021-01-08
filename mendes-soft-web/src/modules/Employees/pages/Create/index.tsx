import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";

import * as Yup from "yup";

import Input from "@/components/Form/Input";

import {
  Box,
  BoxTitle,
  Container,
  Content,
  ContentLeft,
  ContentRight,
} from "./styles";
import { FiCheck } from "react-icons/fi";
import { FormHandles, Scope } from "@unform/core";
import { getValidationErrors } from "@/utils/getValidationErrors";
import { useToast } from "@/hooks/toast";
import SecondLayout from "@/layouts/SecondLayout";
import InputGroup from "@/components/InputGroup";
import InputMask from "@/components/Form/InputMask";
import validateDocument from "@/utils/validateDocument";
import { findCEP } from "@/services/apiCep";
import api from "@/services/api";
import { Employee, Person } from "@/interfaces";
import { useHistory } from "react-router-dom";

Yup.setLocale({
  number: {
    min: "${path} valor inválido",
  },
});

const EmployeeCreate: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();

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
            username: Yup.string().required("Usuário Obrigatório"),
            password: Yup.string().required("Senha Obrigatória"),
          }),
          employee: Yup.object().shape({
            comission: Yup.number(),
            salary: Yup.number().required("Salário Obrigatório"),
          }),
          address: Yup.object().shape({
            cep: Yup.string().required("CEP Obrigatório"),
            public_name: Yup.string().required("Logradouro Obrigatório"),
            number: Yup.string().required("Numero Obrigatório"),
            aditional: Yup.string(),
            district: Yup.string().required("Bairro Obrigatório"),
            city: Yup.string().required("Cidade Obrigatória"),
            state: Yup.string().required("Estado Obrigatório"),
          }),
          contact: Yup.object().shape({
            email: Yup.string().email("Precisa ser um email Válido"),
            celphone: Yup.string().required("Celular Obrigatório"),
          }),
        });

        await schope.validate(data, {
          abortEarly: false,
        });

        await api
          .post<Person>("/person", { person: data.person })
          .then(async (resPerson) => {
            await api.post("/address", {
              personId: resPerson.data.id,
              address: data.address,
            });
            await api.post("/contact", {
              personId: resPerson.data.id,
              contact: data.contact,
            });

            await api
              .post<Employee>("/employee", {
                personId: resPerson.data.id,
                employee: data.employee,
              })
              .then(async (respEmployee) => {
                await api.post("/user", {
                  personId: respEmployee.data.id,
                  user: data.user,
                });
              });
          });

        toast.addToast({
          title: "Criado",
          type: "success",
          description: `Salvou ${data.person.name}`,
        });
        history.goBack();
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
    [toast, history]
  );

  return (
    <SecondLayout topTitle="Novo Funcionário">
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Content>
            <ContentLeft>
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
                  <Input name="username" label="Usuário:" />
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
            </ContentLeft>
            <ContentRight>
              <Box>
                <BoxTitle>
                  <span>4</span> Endereço Principal
                </BoxTitle>
                <Scope path="address">
                  <InputMask
                    name="cep"
                    label="CEP:"
                    mask="99.999-999"
                    onBlur={async (e) => {
                      const cep = e.target.value;

                      const formattedCEP = cep
                        .replace("-", "")
                        .replace(".", "");
                      console.log(formattedCEP);
                      await findCEP(formattedCEP).then((response) => {
                        console.log(response);
                        formRef.current?.setData({
                          address: {
                            public_name: response?.logradouro,
                            city: response?.localidade,
                            additionals: response?.complemento,
                            district: response?.bairro,
                            state: response?.uf,
                          },
                        });
                      });
                    }}
                  />
                  <InputGroup>
                    <Input name="public_name" label="Logradouro:" />
                    <Input
                      name="number"
                      label="Numero:"
                      containerStyle={{ maxWidth: 150 }}
                    />
                  </InputGroup>
                  <Input name="aditional" label="Complemento:" />
                  <InputGroup>
                    <Input name="district" label="Bairro:" />
                    <Input name="city" label="Cidade:" />
                    <Input name="state" label="Estado:" />
                  </InputGroup>
                </Scope>
              </Box>
              <Box>
                <BoxTitle>
                  <span>1</span> Contato Principal
                </BoxTitle>
                <Scope path="contact">
                  <Input name="email" label="Email:" type="email" />
                  <InputMask
                    name="celphone"
                    label="Telefone:"
                    mask="(99) 9.9999-9999"
                  />
                </Scope>
              </Box>
            </ContentRight>
          </Content>

          <button type="submit">
            <FiCheck size={25} />
            Concluir
          </button>
        </Form>
      </Container>
    </SecondLayout>
  );
};

export default EmployeeCreate;
