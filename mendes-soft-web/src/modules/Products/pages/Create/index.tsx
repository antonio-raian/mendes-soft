import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";

import * as Yup from "yup";

import Input from "@/components/Form/Input";

import { Container } from "./styles";
import Select, { SelectObject } from "@/components/Form/Select";
import { FiCheck } from "react-icons/fi";
import { FormHandles, Scope } from "@unform/core";
import { getValidationErrors } from "@/utils/getValidationErrors";
import { useToast } from "@/hooks/toast";
import SecondLayout from "@/layouts/SecondLayout";
import api from "@/services/api";
import { Category } from "@/interfaces";
import { useHistory } from "react-router-dom";
import { useAuth } from "@/hooks/auth";

Yup.setLocale({
  number: {
    min: "${path} valor inválido",
  },
});

const ProductCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const toast = useToast();
  const { signOut } = useAuth();

  const [categories, setCategories] = useState<SelectObject[]>([]);

  useEffect(() => {
    async function handleLoad() {
      await api
        .get<Category[]>("/category")
        .then((response) => {
          setCategories(
            response.data.map((cat) => ({ label: cat.name, value: cat.id }))
          );
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
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});

        const schope = Yup.object().shape({
          category: Yup.number().required("Categoria é obrigatória!").min(1),
          item: Yup.object().shape({
            bar_code: Yup.string(),
            name: Yup.string().required("Nome Obrigatório"),
            description: Yup.string(),
            gain: Yup.number(),
          }),
        });

        await schope.validate(data, {
          abortEarly: false,
        });

        await api.post("/item", data);

        toast.addToast({
          title: "Sucesso",
          type: "success",
          description: `Salvou ${data.item.name}`,
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
      }
    },
    [toast, history]
  );

  return (
    <SecondLayout topTitle="Novo Produto">
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Scope path="item">
            <Input name="bar_code" label="Código de Barra" />
            <Input name="name" label="Nome" />
            <Input name="description" label="Descrição" />
            <Input
              name="gain"
              label="Lucro (%)"
              type="number"
              min={0}
              defaultValue={0}
            />
          </Scope>
          <Select
            defaultValue={{ label: "Selecione uma Categoria", value: 0 }}
            name="category"
            label="Categoria"
            options={categories}
          />
          <button type="submit">
            <FiCheck size={25} />
            Concluir
          </button>
        </Form>
      </Container>
    </SecondLayout>
  );
};

export default ProductCreate;
