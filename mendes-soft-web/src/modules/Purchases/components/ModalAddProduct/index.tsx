import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";

import * as Yup from "yup";

import Input from "@/components/Form/Input";

import { Container } from "./styles";
import { FiCheck } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { getValidationErrors } from "@/utils/getValidationErrors";
import { useToast } from "@/hooks/toast";
import ModalComponent from "@/components/Modal";
import api from "@/services/api";
import Select, { SelectObject } from "@/components/Form/Select";
import InputGroup from "@/components/InputGroup";
import { Item } from "@/interfaces";
import { useHistory } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { ItemTable } from "../../pages/Create";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  actionButton: ({}: ItemTable) => void;
}

Yup.setLocale({
  number: {
    moreThan: "${path} precisa ser maior que ${more}",
  },
});

const ModalAddProduct: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  actionButton,
}) => {
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
          id: Yup.number().moreThan(0).required("Selecione o Produto"),
          quantity: Yup.number()
            .moreThan(0)
            .required("Quantidade maior ou igual a 0"),
          unit_value: Yup.number().moreThan(0).required("Valor maior que 0"),
        });

        await schope.validate(data, {
          abortEarly: false,
        });
        const name = products?.find((prod) => prod.value === data.id)?.label;
        actionButton({ ...data, name });

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
      }
    },
    [toast, products]
  );

  return (
    <ModalComponent
      title="Adicionar Produto"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width={500}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Select
            defaultValue={{ label: "Selecione um Produto", value: 0 }}
            name="id"
            label="Produto"
            options={products}
          />
          <InputGroup>
            <Input
              name="quantity"
              label="Quantidade"
              type="number"
              defaultValue={0}
            />
            <Input
              name="unit_value"
              label="Valor"
              type="number"
              defaultValue={0}
              step="0.01"
            />
          </InputGroup>
          <button type="submit">
            <FiCheck size={25} />
            Concluir
          </button>
        </Form>
      </Container>
    </ModalComponent>
  );
};

export default ModalAddProduct;
