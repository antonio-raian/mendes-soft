import ModalComponent from "@/components/Modal";
import { Category } from "@/interfaces";
import api from "@/services/api";
import React, { useCallback, useEffect, useState } from "react";
import { FiCheck, FiEdit, FiTrash2, FiX } from "react-icons/fi";
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
  const [category, setCategory] = useState({} as Category);
  const [modalDeleteCategory, setModalDeleteCategory] = useState(false);
  const [modalUpdateCategory, setModalUpdateCategory] = useState(false);

  const changeModalUpdate = useCallback(() => {
    setModalUpdateCategory((state) => !state);
  }, []);

  useEffect(() => {
    isOpen && handleLoad();
  }, [isOpen, modalUpdateCategory]);

  const handleLoad = async () => {
    try {
      const response = await api.get<Category[]>(`/category?id=${itemId}`);

      setCategory(response.data[0]);
    } catch (e) {
      console.log("erro no details", e.response);
    }
  };

  const handleDelete = useCallback(async () => {
    setModalDeleteCategory(false);
    try {
      await api.delete(`/category/${category.id}`);

      setIsOpen();
    } catch (e) {}
  }, [setIsOpen, category]);

  return (
    <>
      <ModalComponent
        title="Detalhes de Produto"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        width={500}>
        <Container>
          <Details>
            <p>
              <b>Código Interno: </b>
              {category.id}
            </p>
            <p>
              <b>Nome: </b>
              {category.name}
            </p>
            <p>
              <b>Descrição: </b>
              {category.description}
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
