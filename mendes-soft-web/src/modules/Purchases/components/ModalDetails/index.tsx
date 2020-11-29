import ModalComponent from "@/components/Modal";
import React, { useCallback, useState } from "react";
import { FiCheck, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Buttons, Container, Details } from "./styles";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  itemId: string;
}

const ModalDetailsPurchase: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  itemId,
}) => {
  const history = useHistory();

  const [modalDelete, setModalDelete] = useState(false);

  const redirectToUpdate = useCallback(() => {
    history.push("/compras/atualiza", { itemId });
  }, [itemId, history]);

  const handleDelete = useCallback(() => {
    setModalDelete(false);
    setIsOpen();
  }, [setIsOpen, setModalDelete]);

  return (
    <>
      <ModalComponent
        title="Detalhes da Compra"
        isOpen={isOpen}
        setIsOpen={() => setIsOpen()}
        width={500}>
        <Container>
          <Details>
            <p>
              <b>Código Interno: </b>123
            </p>
            <p>
              <b>Nome: </b>Remédo
            </p>
            <p>
              <b>Descrição: </b>Remédo de fezes
            </p>
            <p>
              <b>Categoria: </b>Farmacia
            </p>
            <p>
              <b>Lucro: </b>10%
            </p>
            <p>
              <b>Código de Barra: </b>123654987
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
        title="Remover Compra"
        isOpen={modalDelete}
        setIsOpen={() => {}}
        width={500}
        closeOnOverlay={true}>
        <Container>
          <h3>Deseja remover a compra {"nome"}?</h3>
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

export default ModalDetailsPurchase;
