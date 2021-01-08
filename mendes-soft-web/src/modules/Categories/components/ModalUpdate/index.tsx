import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";

import * as Yup from "yup";

import Input from "@/components/Form/Input";

import { Container } from "./styles";
import { FiCheck } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { getValidationErrors } from "@/utils/getValidationErrors";
import { useToast } from "@/hooks/toast";
import ModalComponent from "@/components/Modal";
import api from "@/services/api";
import { Category } from "@/interfaces";
import Loading from "@/components/Loading";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  itemId: string;
}

Yup.setLocale({
  number: {
    min: "${path} valor inválido",
  },
});

const ModalUpdateCategory: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  itemId,
}) => {
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();
  const [category, setCategory] = useState({} as Category);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = async () => {
      try {
        setLoading(true);
        const response = await api.get<Category[]>(`/category?id=${itemId}`);

        setCategory(response.data[0]);
        setLoading(false);
      } catch (e) {
        console.log("erro no update", e.response);
      }
    };
    isOpen && handleLoad();
  }, [isOpen, itemId]);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schope = Yup.object().shape({
          name: Yup.string().required("Nome Obrigatório"),
          description: Yup.string(),
        });

        await schope.validate(data, {
          abortEarly: false,
        });

        await api.put("/category", { category: { id: category.id, ...data } });

        toast.addToast({
          title: "Sucesso",
          type: "success",
          description: `Salvou ${data}`,
        });
        setIsOpen();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }
        console.log(error.response);
        toast.addToast({
          title: "Falha",
          type: "error",
          description: `Erro ao editar Categoria: ${JSON.stringify(
            error.response
          )}`,
        });
      }
    },
    [toast, setIsOpen, category]
  );

  return (
    <ModalComponent
      title="Atualização Categoria"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width={500}>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <Form
            initialData={category}
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ width: "100%" }}>
            <Input name="name" label="Nome" />
            <Input name="description" label="Descrição" />
            <button type="submit">
              <FiCheck size={25} />
              Concluir
            </button>
          </Form>
        )}
      </Container>
    </ModalComponent>
  );
};

export default ModalUpdateCategory;
