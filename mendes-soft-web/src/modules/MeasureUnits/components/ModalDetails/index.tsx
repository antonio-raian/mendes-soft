import Loading from "@/components/Loading";
import ModalComponent from "@/components/Modal";
import ModalDelete from "@/components/ModalDelete";
import { MeasureUnit } from "@/interfaces";
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

const ModalDetailsMeasureUnit: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  itemId,
}) => {
  const [measure, setMeasure] = useState({} as MeasureUnit);

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
        const response = await api.get<MeasureUnit[]>(
          `/measure_unit?id=${itemId}`
        );

        setMeasure(response.data[0]);
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
      await api.delete(`/measure_unit/${measure.id}`);

      setIsOpen();
    } catch (e) {}
  }, [setIsOpen, measure]);

  return (
    <>
      <ModalComponent
        title="Detalhes de Unidade de Medida"
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
                  {measure.id}
                </p>
                <p>
                  <b>Nome: </b>
                  {measure.description}
                </p>
                <p>
                  <b>Sigla: </b>
                  {measure.initials}
                </p>
                <p>
                  <b>Status: </b>
                  {measure.active ? "Ativo" : "Removido"}
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
        title="Remover Unidade de Medida"
        isOpen={modalDeleteCategory}
        modelName={measure.description}
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

export default ModalDetailsMeasureUnit;
