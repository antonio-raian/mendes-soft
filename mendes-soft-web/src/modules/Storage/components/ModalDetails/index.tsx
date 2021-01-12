import Loading from "@/components/Loading";
import ModalComponent from "@/components/Modal";
import { useToast } from "@/hooks/toast";
import { Storage } from "@/interfaces";
import api from "@/services/api";
import React, { useCallback, useEffect, useState } from "react";
import { FiCheck, FiEdit } from "react-icons/fi";
import { Buttons, Container, Details } from "./styles";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  itemId: string;
}

const ModalDetailsStorage: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  itemId,
}) => {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const [valueSale, setValueSale] = useState(0);
  const [valueCost, setValueCost] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [storage, setStorage] = useState({} as Storage);

  useEffect(() => {
    async function handleLoad() {
      await api.get<Storage[]>(`/storage?id=${itemId}`).then((response) => {
        setStorage(response.data[0]);

        setQuantity(response.data[0].quantity);
        setValueSale(response.data[0].value_sale);
        setValueCost(response.data[0].value_cost);

        setLoading(false);
      });
    }
    isOpen && handleLoad();
  }, [isOpen, itemId, update]);

  const handleSubmit = useCallback(async () => {
    try {
      console.log(valueSale, quantity);
      await api.put("/storage", {
        storage: {
          id: storage.id,
          value_sale: valueSale,
          value_cost: valueCost,
          quantity,
        },
      });
      toast.addToast({
        title: "Sucesso",
        type: "success",
        description: `Salvou`,
      });
      setUpdate(false);
    } catch (error) {
      console.log(error.response);
      toast.addToast({
        title: "Falha",
        type: "error",
        description: `Erro ao editar Estoque: ${JSON.stringify(
          error.response
        )}`,
      });
    }
  }, [storage, valueSale, valueCost, quantity, toast]);

  return (
    <>
      <ModalComponent
        title="Estoque do Produto"
        isOpen={isOpen}
        setIsOpen={() => setIsOpen()}
        width={500}>
        <Container>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Details>
                <p>
                  <b>Código Interno: </b>
                  {storage.item.id}
                </p>
                <p>
                  <b>Nome: </b>
                  {storage.item.name}
                </p>
                <p>
                  <b>Descrição: </b>
                  {storage.item.description}
                </p>
                <p>
                  <b>Quantidade: </b>
                  {!update ? (
                    quantity
                  ) : (
                    <input
                      value={quantity}
                      type="number"
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  )}
                </p>
                <p>
                  <b>Preço de Venda: </b>
                  R${" "}
                  {!update ? (
                    valueSale.toFixed(2)
                  ) : (
                    <input
                      value={valueSale}
                      type="number"
                      onChange={(e) => setValueSale(Number(e.target.value))}
                    />
                  )}
                </p>
                <p>
                  <b>Preço de Compra: </b>
                  R${" "}
                  {!update ? (
                    valueCost.toFixed(2)
                  ) : (
                    <input
                      value={valueCost}
                      type="number"
                      onChange={(e) => setValueCost(Number(e.target.value))}
                    />
                  )}
                </p>
                <p>
                  <b>Código de Barra: </b>
                  {storage.item.bar_code}
                </p>
              </Details>
              <Buttons>
                {!update ? (
                  <button onClick={() => setUpdate((state) => !state)}>
                    <FiEdit size={20} />
                    Editar
                  </button>
                ) : (
                  <button onClick={handleSubmit}>
                    <FiCheck size={20} />
                    Salvar
                  </button>
                )}
              </Buttons>
            </>
          )}
        </Container>
      </ModalComponent>
    </>
  );
};

export default ModalDetailsStorage;
