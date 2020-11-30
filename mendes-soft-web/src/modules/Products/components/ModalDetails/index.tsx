import ModalComponent from "@/components/Modal";
import { Item } from "@/interfaces";
import api from "@/services/api";
import React, { useCallback, useEffect, useState } from "react";
import { FiCheck, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Buttons, Container, Details } from "./styles";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  itemId: string;
}

const ModalDetailsProduct: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  itemId,
}) => {
  const history = useHistory();

  const [product, setProduct] = useState({} as Item);
  const [modalDelete, setModalDelete] = useState(false);
  async function handleLoad() {
    await api.get(`/item?id=${itemId}`).then((response) => {
      setProduct(response.data[0]);
    });
  }
  useEffect(() => {
    isOpen && handleLoad();
  }, [isOpen, itemId]);

  const redirectToUpdate = useCallback(() => {
    history.push("/produtos/atualiza", { itemId });
  }, [itemId, history]);

  const handleDelete = useCallback(async () => {
    setModalDelete(false);
    try {
      await api.delete(`/item/${product.id}`);

      setIsOpen();
    } catch (e) {}
  }, [setIsOpen, product]);

  return (
    <>
      <ModalComponent
        title="Detalhes de Produto"
        isOpen={isOpen}
        setIsOpen={() => setIsOpen()}
        width={500}>
        <Container>
          <Details>
            <p>
              <b>Código Interno: </b>
              {product.id}
            </p>
            <p>
              <b>Nome: </b>
              {product.name}
            </p>
            <p>
              <b>Descrição: </b>
              {product.description}
            </p>
            <p>
              <b>Categoria: </b>
              {product.category?.name}
            </p>
            <p>
              <b>Lucro: </b>
              {product.gain}%
            </p>
            <p>
              <b>Código de Barra: </b>
              {product.bar_code}
            </p>
          </Details>
          <Buttons>
            <button onClick={redirectToUpdate}>
              <FiEdit size={20} />
              Editar
            </button>
            <button
              className="error"
              onClick={() => setModalDelete((state) => !state)}>
              <FiTrash2 size={20} />
              Excluir
            </button>
          </Buttons>
        </Container>
      </ModalComponent>

      {/* Modal Delete */}
      <ModalComponent
        title="Remover Produto"
        isOpen={modalDelete}
        setIsOpen={() => {}}
        width={500}
        closeOnOverlay={true}>
        <Container>
          <h3>Deseja remover o produto {"nome produto"}?</h3>
          <Buttons>
            <button onClick={handleDelete}>
              <FiCheck size={20} />
              Sim
            </button>
            <button
              className="error"
              onClick={() => setModalDelete((state) => !state)}>
              <FiX size={20} />
              Não
            </button>
          </Buttons>
        </Container>
      </ModalComponent>
    </>
  );
};

export default ModalDetailsProduct;
