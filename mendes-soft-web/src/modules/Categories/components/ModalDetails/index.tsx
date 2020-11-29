import ModalComponent from "@/components/Modal";
import React, { useCallback, useState } from "react";
import { FiCheck, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import ModalUpdateCategory from "../ModalUpdate";
import { Buttons, Container, Details } from "./styles";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  itemId: string;
}

const ModalDetailsCategory: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  itemId,
}) => {
  const history = useHistory();

  const [modalDeleteCategory, setModalDeleteCategory] = useState(false);
  const [modalUpdateCategory, setModalUpdateCategory] = useState(false);

  const changeModalUpdate = useCallback(() => {
    setModalUpdateCategory((state) => !state);
  }, []);

  const handleDelete = useCallback(() => {
    setModalDeleteCategory(false);
    setIsOpen();
  }, [setIsOpen, setModalDeleteCategory]);

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
              <b>Código Interno: </b>123
            </p>
            <p>
              <b>Nome: </b>Remédo
            </p>
            <p>
              <b>Descrição: </b>Remédo de fezes
            </p>
          </Details>
          <Buttons>
            <button onClick={changeModalUpdate}>
              <FiEdit size={20} />
              Editar
            </button>
            <button
              className="error"
              onClick={() => setModalDeleteCategory((state) => !state)}>
              <FiTrash2 size={20} />
              Excluir
            </button>
          </Buttons>
        </Container>
      </ModalComponent>

      {/* Modal Delete */}
      <ModalComponent
        title="Remover Categoria"
        isOpen={modalDeleteCategory}
        setIsOpen={() => {}}
        width={500}
        closeOnOverlay={true}>
        <Container>
          <h3>Deseja remover a categoria {"nome produto"}?</h3>
          <Buttons>
            <button onClick={handleDelete}>
              <FiCheck size={20} />
              Sim
            </button>
            <button
              className="error"
              onClick={() => setModalDeleteCategory((state) => !state)}>
              <FiX size={20} />
              Não
            </button>
          </Buttons>
        </Container>
      </ModalComponent>

      {/* Modal Update */}
      <ModalUpdateCategory
        isOpen={modalUpdateCategory}
        setIsOpen={changeModalUpdate}
        itemId={itemId}
      />
    </>
  );
};

export default ModalDetailsCategory;
