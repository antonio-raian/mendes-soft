import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";

import * as Yup from "yup";

import Input from "@/components/Form/Input";

import { Button, Container, FormFooter, Section, Separate } from "./styles";
import Select from "@/components/Form/Select";
import { FiCheck, FiPlus, FiTrash } from "react-icons/fi";
import { FormHandles, Scope } from "@unform/core";
import { getValidationErrors } from "@/utils/getValidationErrors";
import { useToast } from "@/hooks/toast";
import SecondLayout from "@/layouts/SecondLayout";
import TableContainer from "@/components/TableContainer";
import { Status, TypePayment } from "@/utils/prefixedData";
import ModalAddProduct from "../../components/ModalAddProduct";
import { format, parseISO } from "date-fns";
import { useHistory } from "react-router-dom";
import api from "@/services/api";

Yup.setLocale({
  number: {
    min: "${path} valor inválido",
  },
});

const handle = [
  { id: "name", name: "Nome" },
  { id: "quantity", name: "Quantidade" },
  { id: "unit_value", name: "Valor Unitário" },
  { id: "value_all", name: "Valor Total" },
  { id: "actions", name: "     " },
];

export interface ItemTable {
  id: string;
  name: string;
  quantity: number;
  unit_value: number;
  value_all: number;
}

const PurchaseCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const toast = useToast();

  const [items, setItens] = useState<ItemTable[]>([]);
  const [valueTotal, setValueTotal] = useState(0);

  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
    const aux = JSON.parse(
      localStorage.getItem("@mendes-soft:itens_compra") || "[]"
    );
    let vAll = 0;
    aux.map((data: ItemTable) => (vAll += data.value_all));

    setItens(aux);
    setValueTotal(vAll);
  }, []);

  const changeModalAdd = useCallback(() => {
    setModalAdd((state) => !state);
  }, []);

  const addItem = useCallback((item) => {
    const aux = JSON.parse(
      localStorage.getItem("@mendes-soft:itens_compra") || "[]"
    );
    const value = item.quantity * item.unit_value;

    aux.push({ ...item, value_all: value });
    setItens(aux);

    // Calculate valor total
    let vAll = 0;
    aux.map((data: ItemTable) => (vAll += data.value_all));
    setValueTotal(vAll);

    // salvar
    localStorage.setItem("@mendes-soft:itens_compra", JSON.stringify(aux));
  }, []);

  const removeItem = useCallback(
    (item) => {
      let aux = JSON.parse(
        localStorage.getItem("@mendes-soft:itens_compra") || "[]"
      );

      // Calculate valor total
      let vAll = 0;
      aux.map((data: ItemTable) => (vAll += data.value_all));
      setValueTotal(vAll);

      aux = aux.filter((i: ItemTable) => i.id !== item.id);
      setItens(aux);

      // salvar
      localStorage.setItem("@mendes-soft:itens_compra", JSON.stringify(aux));
    },
    [items, valueTotal]
  );

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        console.log(data, items);
        const schope = Yup.object().shape({
          type_payment: Yup.string(),
          expected_payment_date: Yup.string(),
          status: Yup.string(),
        });

        await schope.validate(data, {
          abortEarly: false,
        });
        toast.addToast({
          title: "Sucesso",
          type: "success",
          description: `Salvou nova compra`,
        });

        await api.post("/purchase", { purchase: { items, ...data } });

        localStorage.setItem("@mendes-soft:itens_compra", "[]");
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
        console.log(error.response);
        toast.addToast({
          title: "Falha",
          type: "error",
          description: `${Object.values(error.response)}`,
        });
      }
    },
    [toast, items]
  );

  return (
    <>
      <ModalAddProduct
        isOpen={modalAdd}
        setIsOpen={changeModalAdd}
        actionButton={addItem}
      />
      <SecondLayout topTitle="Nova Compra">
        <Container>
          <Section
            style={{
              width: "70%",
            }}>
            <TableContainer containerStyle={{ width: "100%" }}>
              <table>
                <thead>
                  <tr>
                    {handle.map((h) => (
                      <th id={h.id}>{h.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>R$ {Number(item.unit_value).toFixed(2)} </td>
                      <td>R$ {Number(item.value_all).toFixed(2)} </td>
                      <td onClick={() => removeItem(item)}>
                        <FiTrash />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
          </Section>

          <Separate />

          <Section
            style={{
              width: "30%",
            }}>
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ width: "100%" }}>
              <Button>
                <button type="button" onClick={changeModalAdd}>
                  <FiPlus size={30} />
                  Adicionar Produto
                </button>
              </Button>
              <Select
                defaultValue={TypePayment[0]}
                name="type_payment"
                label="Tipo de Pagamento"
                options={TypePayment}
              />
              <Select
                defaultValue={Status[0]}
                name="status"
                label="Situação"
                options={Status}
              />
              <Input
                name="expected_payment_date"
                label="Data para Pagamento"
                type="date"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
              />
              <FormFooter>
                <text>Valor Total: R$ {valueTotal.toFixed(2)}</text>
                <button type="submit">
                  <FiCheck size={25} />
                  Concluir
                </button>
              </FormFooter>
            </Form>
          </Section>
        </Container>
      </SecondLayout>
    </>
  );
};

export default PurchaseCreate;
