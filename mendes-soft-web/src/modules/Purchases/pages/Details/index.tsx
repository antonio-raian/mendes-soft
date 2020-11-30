import React, { useCallback, useEffect, useState } from "react";

import { Button, Container, Section, Separate } from "./styles";
import SecondLayout from "@/layouts/SecondLayout";
import TableContainer from "@/components/TableContainer";
import { Status, TypePayment } from "@/utils/prefixedData";
import { format, parseISO } from "date-fns";
import { useHistory, useLocation } from "react-router-dom";
import api from "@/services/api";
import { Purchase } from "@/interfaces";
import handleError from "@/utils/handleError";
import Loading from "@/components/Loading";
import { useToast } from "@/hooks/toast";

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

interface State {
  itemId: string;
}

const PurchaseDetails: React.FC = () => {
  const history = useHistory();
  const { state } = useLocation<State>();

  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState({} as Purchase);
  const [items, setItens] = useState<ItemTable[]>([]);

  useEffect(() => {
    async function handleLoad() {
      await api
        .get<Purchase[]>(`/purchase?id=${state.itemId}`)
        .then((res) => {
          setPurchase(res.data[0]);
          setItens(JSON.parse(res.data[0].items));
          setLoading(false);
        })
        .catch((e) => {
          handleError(e);
        });
    }
    handleLoad();
  }, []);

  const handleDelete = useCallback(async () => {
    await api
      .delete(`/purchase/${state.itemId}`)
      .then((res) => {
        toast.addToast({
          title: "Sucesso",
          type: "success",
          description: `Compra cancelada!`,
        });
        history.goBack();
      })
      .catch((e) => {
        toast.addToast({
          title: "Falha",
          type: "error",
          description: `${Object.values(e.response?.message)}`,
        });
      });
  }, []);

  if (loading)
    return (
      <SecondLayout>
        <Loading />
      </SecondLayout>
    );

  return (
    <SecondLayout topTitle="Nova Compra">
      <Container>
        <Section
          style={{
            width: "30%",
          }}>
          <label>
            <b>Compra feita dia:</b>{" "}
            {format(parseISO(purchase?.created_at), "dd/MM/yyyy")}
          </label>
          <span>
            <b>Funcionário Responsável:</b> {purchase?.employee.person.name}
          </span>
          <p>
            <b>Tipo de Pagamento: </b>
            {
              TypePayment.find((tp) => tp.value === purchase.type_payment)
                ?.label
            }
          </p>
          <p>
            <b>Situação:</b>{" "}
            {Status.find((st) => st.value === purchase.status)?.label}
          </p>
          <p>
            <b>Valor total:</b> R$ {purchase.value.toFixed(2)}
          </p>
          {purchase.status !== "canceled" && (
            <Button>
              <button onClick={handleDelete}>Apagar</button>
            </Button>
          )}
        </Section>
        <Separate />
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
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </Section>
      </Container>
    </SecondLayout>
  );
};

export default PurchaseDetails;
