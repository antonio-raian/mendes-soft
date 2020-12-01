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
import { useHistory, useLocation } from "react-router-dom";
import { Category, Item } from "@/interfaces";
import api from "@/services/api";
import { useAuth } from "@/hooks/auth";
import Loading from "@/components/Loading";

Yup.setLocale({
  number: {
    min: "${path} valor inválido",
  },
});

interface State {
  itemId: number | string;
}

const ProductUpdate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const toast = useToast();
  const { signOut } = useAuth();
  const { state } = useLocation<State>();

  const [product, setProduct] = useState({} as Item);
  const [categories, setCategories] = useState<SelectObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleLoad() {
      setLoading(true);
      await api
        .get<Item[]>(`/item?id=${state.itemId}`)
        .then(async (resProd) => {
          setProduct(resProd.data[0]);
          await api.get<Category[]>("/category").then((response) => {
            const aux = response.data.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }));
            setCategories(aux);
          });
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
  }, [state]);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schope = Yup.object().shape({
          item: Yup.object().shape({
            id: Yup.number(),
            bar_code: Yup.string().required("Código de Barra Obrigatório"),
            name: Yup.string().required("Nome Obrigatório"),
            description: Yup.string(),
            gain: Yup.number(),
            category_id: Yup.number()
              .required("Categoria é obrigatória!")
              .min(1),
          }),
        });

        await schope.validate(data, {
          abortEarly: false,
        });

        await api.put("/item", data);

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
    [toast]
  );

  if (loading)
    return (
      <SecondLayout topTitle="Atualização  Produto">
        <Loading />
      </SecondLayout>
    );

  return (
    <SecondLayout topTitle="Atualização  Produto">
      <Container>
        <Form
          initialData={{
            item: {
              ...product,
              category_id: categories.find(
                (cat) => cat.value === product.category?.id
              ),
            },
          }}
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ width: "100%" }}>
          <Scope path="item">
            <Input name="id" label="Código Interno" disabled={true} />
            <Input name="bar_code" label="Código de Barra" />
            <Input name="name" label="Nome" />
            <Input name="description" label="Descrição" />
            <Input name="gain" label="Lucro (%)" type="number" min={0} />
            <Select name="category_id" label="Categoria" options={categories} />
          </Scope>
          <button type="submit">
            <FiCheck size={25} />
            Concluir
          </button>
        </Form>
      </Container>
    </SecondLayout>
  );
};

export default ProductUpdate;
