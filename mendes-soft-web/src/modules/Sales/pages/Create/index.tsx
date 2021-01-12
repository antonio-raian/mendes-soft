/* eslint-disable no-template-curly-in-string */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";

import * as Yup from "yup";

import Input from "@/components/Form/Input";

import { Button, Container, FormFooter, Section, Separate } from "./styles";
import Select, { SelectObject } from "@/components/Form/Select";
import { FiCheck, FiPlus, FiTrash } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { getValidationErrors } from "@/utils/getValidationErrors";
import { useToast } from "@/hooks/toast";
import SecondLayout from "@/layouts/SecondLayout";
import TableContainer from "@/components/TableContainer";
import { FormPayment, Status, TypePayment } from "@/utils/prefixedData";
import { format, add } from "date-fns";
import { useHistory } from "react-router-dom";
import api from "@/services/api";
import ModalAddProduct from "../../components/ModalAddProduct";
import { OptionTypeBase } from "react-select";
import InputGroup from "@/components/InputGroup";
import { Client } from "@/interfaces";
import handleError from "@/utils/handleError";

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

const SaleCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const toast = useToast();

  const [items, setItens] = useState<ItemTable[]>([]);
  const [clients, setClients] = useState<SelectObject[]>([]);

  const [valueTotal, setValueTotal] = useState(0);
  const [discount, setDiscount] = useState(10);
  const [parcels, setParcels] = useState(2);
  const [form_payment, setFormPayment] = useState<OptionTypeBase>(
    FormPayment[0]
  );

  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
    const handleLoad = async () => {
      await api.get<Client[]>("/client").then((res) => {
        setClients(
          res.data.map((cli) => ({ label: cli.person.name, value: cli.id }))
        );
      });
    };
    const aux = JSON.parse(
      localStorage.getItem("@mendes-soft:itens_venda") || "[]"
    );
    let vAll = 0;
    aux.map((data: ItemTable) => (vAll += data.value_all));
    handleLoad();
    setItens(aux);
    setValueTotal(vAll);
  }, []);

  const changeModalAdd = useCallback(() => {
    setModalAdd((state) => !state);
  }, []);

  const addItem = useCallback((item) => {
    const aux = JSON.parse(
      localStorage.getItem("@mendes-soft:itens_venda") || "[]"
    );
    const value = item.quantity * item.unit_value;

    aux.push({ ...item, value_all: value });
    setItens(aux);

    // Calculate valor total
    let vAll = 0;
    aux.map((data: ItemTable) => (vAll += data.value_all));
    setValueTotal(vAll);

    // salvar
    localStorage.setItem("@mendes-soft:itens_venda", JSON.stringify(aux));
  }, []);

  const removeItem = useCallback((item) => {
    let aux = JSON.parse(
      localStorage.getItem("@mendes-soft:itens_venda") || "[]"
    );

    // Calculate valor total
    let vAll = 0;
    aux.map((data: ItemTable) => (vAll += data.value_all));
    setValueTotal(vAll);

    aux = aux.filter((i: ItemTable) => i.id !== item.id);
    setItens(aux);

    // salvar
    localStorage.setItem("@mendes-soft:itens_venda", JSON.stringify(aux));
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        console.log(data, items);
        const schope = Yup.object().shape({
          type_payment: Yup.string(),
          form_payment: Yup.string(),
          expected_payment_date: Yup.string(),
          status: Yup.string(),
        });

        await schope.validate(data, {
          abortEarly: false,
        });

        const dates = [
          {
            date: data.expected_payment_date,
            paid: data.status === "paid",
          },
        ];

        for (let i = 0; i < data.parcels - 1; i++) {
          console.log(dates, dates[i], i);
          dates.push({
            date: format(
              add(new Date(dates[i].date), { days: 30 }),
              "yyyy-MM-dd"
            ),
            paid: false,
          });
        }

        await api.post("/sale", {
          sale: {
            items,
            ...data,
            parcels: undefined,
            expected_payment_date: dates,
          },
        });

        localStorage.setItem("@mendes-soft:itens_venda", "[]");
        toast.addToast({
          title: "Sucesso",
          type: "success",
          description: `Salvou nova venda`,
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
        console.log("Erro", error.response);
        toast.addToast({
          title: "Falha",
          type: "error",
          description: handleError(error),
        });
      }
    },
    [toast, items, history]
  );

  return (
    <>
      <ModalAddProduct
        isOpen={modalAdd}
        setIsOpen={changeModalAdd}
        actionButton={addItem}
      />
      <SecondLayout topTitle="Nova Venda">
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
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <b>Valor Bruto:</b> R$ {valueTotal.toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
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
              <InputGroup>
                <Select
                  defaultValue={TypePayment[0]}
                  name="type_payment"
                  label="Tipo de Pagamento"
                  options={TypePayment}
                />
                <Select
                  value={form_payment}
                  name="form_payment"
                  label="Forma de Pagamento"
                  options={FormPayment}
                  onChange={(e) => {
                    setFormPayment(e ? e : form_payment);
                    setDiscount(e === FormPayment[1] ? 0 : 10);
                  }}
                />
              </InputGroup>
              {form_payment === FormPayment[1] && (
                <>
                  <InputGroup>
                    <Input
                      name="parcels"
                      label="Parcelas"
                      type="number"
                      value={parcels}
                      onChange={(e) => setParcels(Number(e.target.value))}
                    />
                    <div>
                      <p>{`${parcels} x`} </p>
                      {`R$ ${(
                        (valueTotal - valueTotal * (discount / 100)) /
                        parcels
                      ).toFixed(2)}`}
                    </div>
                  </InputGroup>
                  <Select name="client_id" label="Cliente" options={clients} />
                </>
              )}
              <Select
                defaultValue={Status[1]}
                name="status"
                label="Situação"
                options={Status}
              />
              <Input
                name="discount"
                label="Desconto (%)"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
              <Input
                name="expected_payment_date"
                label={`Data para ${
                  form_payment === FormPayment[1] ? "1º" : ""
                } Pagamento`}
                type="date"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
              />
              <FormFooter>
                <text>
                  Valor Final: R${" "}
                  {(valueTotal - valueTotal * (discount / 100)).toFixed(2)}
                </text>
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

export default SaleCreate;
