import Loading from "@/components/Loading";
import ModalComponent from "@/components/Modal";
import ModalDelete from "@/components/ModalDelete";
import { Category } from "@/interfaces";
import api from "@/services/api";
import React, { useCallback, useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
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
  const [loading, setLoading] = useState(true);

  const changeModalUpdate = useCallback(() => {
    setModalUpdateCategory((state) => !state);
  }, []);

  useEffect(() => {
    const handleLoad = async () => {
      try {
        setLoading(true);
        const response = await api.get<Category[]>(`/category?id=${itemId}`);

        setCategory(response.data[0]);
        setLoading(false);
      } catch (e) {
        console.log("erro no details", e.response);
      }
    };
    isOpen && handleLoad();
  }, [isOpen, modalUpdateCategory, itemId]);

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
        title="Detalhes de Categoria"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        width={500}>
        <Container>
          {loading ? (
            <Loading />
          ) : (
            <>
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
            </>
          )}
        </Container>
      </ModalComponent>

      {/* Modal Delete */}
      <ModalDelete
        title="Remover Categoria"
        isOpen={modalDeleteCategory}
        modelName={category.name}
        handleDelete={handleDelete}
        setIsOpen={() => setModalDeleteCategory((state) => !state)}
      />

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
