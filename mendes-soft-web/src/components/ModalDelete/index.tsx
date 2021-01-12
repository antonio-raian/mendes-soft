import React from "react";
import { FiCheck, FiX } from "react-icons/fi";
import ModalComponent from "../Modal";
import { Buttons, Container } from "./styles";

interface ModalDelete {
  title: string;
  isOpen: boolean;
  modelName: string;

  setIsOpen: () => any;
  handleDelete: () => any;
}

const ModalDelete: React.FC<ModalDelete> = ({
  title,
  isOpen,
  modelName,
  setIsOpen,
  handleDelete,
}) => {
  return (
    <ModalComponent
      title={title}
      isOpen={isOpen}
      setIsOpen={() => {}}
      width={500}
      closeOnOverlay={true}>
      <Container>
        <h3>Deseja remover {modelName}?</h3>
        <Buttons>
          <button onClick={handleDelete}>
            <FiCheck size={20} />
            Sim
          </button>
          <button className="error" onClick={setIsOpen}>
            <FiX size={20} />
            Não
          </button>
        </Buttons>
      </Container>
    </ModalComponent>
  );
};

export default ModalDelete;
