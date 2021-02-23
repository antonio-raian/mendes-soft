/* eslint-disable no-template-curly-in-string */
/*eslint-disable no-empty-pattern */
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
import { Storage } from "@/interfaces";
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

  const [valueUnit, setValueUnit] = useState(0);
  const [unit, setUnit] = useState<string>();

  const [products, setProducts] = useState<SelectObject[]>([]);
  const [storages, setStorages] = useState<Storage[]>([]);

  useEffect(() => {
    async function handlLoad() {
      await api
        .get<Storage[]>("/storage")
        .then((respStore) => {
          setStorages(respStore.data);
          setProducts(
            respStore.data
              .filter((storage) => storage.quantity > 0)
              .map((storage) => ({
                label: storage.item.name,
                value: storage.item.id,
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
  }, [history, signOut]);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schope = Yup.object().shape({
          id: Yup.number().moreThan(0).required("Selecione o Produto"),
          quantity: Yup.number()
            .moreThan(0)
            .required("Quantidade maior ou igual a 0"),
          unit_value: Yup.number().moreThan(0),
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
        console.log(error.response);
        toast.addToast({
          title: "Falha",
          type: "error",
          description: `${Object.values(error.response)}`,
        });
      }
    },
    [toast, products, actionButton, setIsOpen]
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
            onChange={(e: any) => {
              console.log(e?.value);
              setValueUnit(
                Number(
                  storages
                    .find((store) => store.item.id === e.value)
                    ?.value_sale.toFixed(2)
                ) || 0
              );
              console.log(
                storages.find((store) => store.item.id === e.value)?.item
              );
              setUnit(
                storages.find((store) => store.item.id === e.value)?.item
                  ?.measure?.initials
              );
            }}
          />
          <InputGroup>
            <Input
              name="quantity"
              label={`Quantidade ${unit ? "(" + unit + ")" : ""}`}
              type="number"
              defaultValue={0}
              step="0.001"
            />
            <Input
              name="unit_value"
              label="Valor R$"
              type="number"
              value={valueUnit}
              step="0.01"
              disabled
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
