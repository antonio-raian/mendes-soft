import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";

import * as Yup from "yup";

import Input from "@/components/Form/Input";

import { Container } from "./styles";
import { FiCheck } from "react-icons/fi";
import { FormHandles, Scope } from "@unform/core";
import { getValidationErrors } from "@/utils/getValidationErrors";
import { useToast } from "@/hooks/toast";
import ModalComponent from "@/components/Modal";
import api from "@/services/api";
import Select, { SelectObject } from "@/components/Form/Select";
import InputGroup from "@/components/InputGroup";
import { Item } from "@/interfaces";
import { useHistory } from "react-router-dom";
import { useAuth } from "@/hooks/auth";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

Yup.setLocale({
  number: {
    moreThan: "${path} precisa ser maior que ${more}",
  },
});

const ModalCreateStorage: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { signOut } = useAuth();

  const toast = useToast();
  const [products, setProducts] = useState<SelectObject[]>();

  useEffect(() => {
    async function handlLoad() {
      await api
        .get<Item[]>("/item")
        .then((respProd) => {
          setProducts(
            respProd.data.map((item) => ({
              label: item.name,
              value: item.id,
            }))
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
    handlLoad();
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schope = Yup.object().shape({
          item: Yup.number().moreThan(0).required("Selecione o Produto"),
          storage: Yup.object().shape({
            quantity: Yup.number()
              .moreThan(0)
              .required("Quantidade maior ou igual a 0"),
            value_cost: Yup.number().moreThan(0).required("Valor maior que 0"),
            value_sale: Yup.number().moreThan(0).required("Valor maior que 0"),
          }),
        });

        await schope.validate(data, {
          abortEarly: false,
        });

        console.log(data);

        await api.post("/storage", data);
        toast.addToast({
          title: "Sucesso",
          type: "success",
          description: `Salvou novo estoque de ${JSON.stringify(
            products?.find((prod) => prod.value === data.item)?.label
          )}`,
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
        console.log(error.response.code);
        toast.addToast({
          title: "Falha",
          type: "error",
          description: `${Object.values(error.response)}`,
        });
      }
    },
    [toast, products]
  );

  return (
    <ModalComponent
      title="Adicionar Produto"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width={700}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Select
            defaultValue={{ label: "Selecione um Produto", value: 0 }}
            name="item"
            label="Produto"
            options={products}
          />
          <Scope path="storage">
            <InputGroup>
              <Input
                name="quantity"
                label="Quantidade"
                type="number"
                defaultValue={0}
              />
              <Input
                name="value_cost"
                label="Valor de Custo"
                type="number"
                defaultValue={0}
                step="0.01"
              />
              <Input
                name="value_sale"
                label="Valor de Venda"
                type="number"
                defaultValue={0}
                step="0.01"
              />
            </InputGroup>
          </Scope>
          <button type="submit">
            <FiCheck size={25} />
            Concluir
          </button>
        </Form>
      </Container>
    </ModalComponent>
  );
};

export default ModalCreateStorage;
