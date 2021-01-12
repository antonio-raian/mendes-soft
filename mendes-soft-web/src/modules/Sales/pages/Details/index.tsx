import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  ButtonContainer,
  Container,
  ModalContainer,
  Section,
  Separate,
} from "./styles";
import SecondLayout from "@/layouts/SecondLayout";
import TableContainer from "@/components/TableContainer";
import { FormPayment, Status, TypePayment } from "@/utils/prefixedData";
import { format, parseISO } from "date-fns";
import { useHistory, useLocation } from "react-router-dom";
import api from "@/services/api";
import { Sale } from "@/interfaces";
import Loading from "@/components/Loading";
import { useToast } from "@/hooks/toast";
import ModalComponent from "@/components/Modal";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import { useAuth } from "@/hooks/auth";

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

export interface Expected {
  date: string;
  paid: boolean;
}

interface State {
  itemId: string;
}

const SaleDetails: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const { state } = useLocation<State>();

  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState({} as Sale);
  const [items, setItens] = useState<ItemTable[]>([]);
  const [parcels, setParcels] = useState<Expected[]>([]);

  const [modalParcels, setModalparcels] = useState(false);
  const [editing, setEditing] = useState(false);

  const changeModalParcels = useCallback(() => {
    setModalparcels((state) => !state);
  }, []);

  useEffect(() => {
    async function handleLoad() {
      await api
        .get<Sale[]>(`/sale?id=${state.itemId}`)
        .then((res) => {
          setSale(res.data[0]);
          setItens(res.data[0].items);
          setParcels(res.data[0].expected_payment_date);

          setLoading(false);
        })
        .catch((e) => {
          console.log("Erro carregando venda", e.response, e);
          if (e.response?.status === 401) {
            signOut();
            history.goBack();
          }
        });
    }
    handleLoad();
  }, [history, signOut, state]);

  const saveParcels = useCallback(async () => {
    console.log(parcels);
    await api.put(`/sale`, {
      sale: { id: sale.id, expected_payment_date: JSON.stringify(parcels) },
    });
  }, [parcels, sale]);

  const handleDelete = useCallback(async () => {
    await api
      .delete(`/sale/${state.itemId}`)
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
  }, [history, state, toast]);

  return (
    <>
      <ModalComponent
        title="Parcelas"
        isOpen={modalParcels}
        setIsOpen={changeModalParcels}
        width={300}>
        <ModalContainer>
          {parcels.map((parc: any) =>
            editing ? (
              <p>
                {format(new Date(parc.date), "dd/MM/yyyy")}
                <input
                  name={parc.date}
                  type="checkbox"
                  defaultChecked={parc.paid}
                  onChange={() => (parc.paid = !parc.paid)}
                />
              </p>
            ) : (
              <p>
                {format(new Date(parc.date), "dd/MM/yyyy")}
                {parc.paid ? (
                  <span className="paid">pago</span>
                ) : (
                  <span className="pending">pendente</span>
                )}
              </p>
            )
          )}
          <ButtonContainer>
            {editing ? (
              <button
                type="button"
                className="save"
                onClick={() => {
                  setEditing((states) => !states);
                  saveParcels();
                }}>
                <FiSave size={20} />
                Salvar
              </button>
            ) : (
              <button
                type="button"
                className="edit"
                onClick={() => {
                  setEditing((states) => !states);
                }}>
                <FiEdit size={20} />
                Editar
              </button>
            )}
            <button type="button" onClick={changeModalParcels}>
              <FiX size={20} />
              OK
            </button>
          </ButtonContainer>
        </ModalContainer>
      </ModalComponent>
      <SecondLayout topTitle="Venda">
        {loading ? (
          <Loading />
        ) : (
          <Container>
            <Section
              style={{
                width: "30%",
              }}>
              <label>
                <b>Venda feita dia:</b>{" "}
                {format(parseISO(sale?.created_at), "dd/MM/yyyy")}
              </label>
              <span>
                <b>Funcionário Responsável:</b> {sale?.employee.person.name}
              </span>
              <p>
                <b>Tipo de Pagamento: </b>
                {
                  TypePayment.find((tp) => tp.value === sale.type_payment)
                    ?.label
                }
              </p>
              <p>
                <b>Forma de Pagamento: </b>
                {
                  FormPayment.find((tp) => tp.value === sale.form_payment)
                    ?.label
                }
              </p>
              {parcels && (
                <p>
                  <b>Parcelas: </b>
                  {parcels.length} x{" "}
                  {(sale.net_value / parcels.length).toFixed(2)}
                  <button type="button" onClick={changeModalParcels}>
                    Ver Parcelas
                  </button>
                </p>
              )}
              <p>
                <b>Situação:</b>{" "}
                {Status.find((st) => st.value === sale.status)?.label}
              </p>
              <p>
                <b>Desconto:</b> {sale.discount}%
              </p>
              <p>
                <b>Valor Final:</b> R$ {sale.net_value.toFixed(2)}
              </p>
              {sale.status !== "canceled" && (
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
                    {items.map((item) => (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>R$ {Number(item.unit_value).toFixed(2)} </td>
                        <td>R$ {Number(item.value_all).toFixed(2)} </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <b>Valor Bruto:</b> R$ {sale.gross_value.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </TableContainer>
            </Section>
          </Container>
        )}
      </SecondLayout>
    </>
  );
};

export default SaleDetails;
