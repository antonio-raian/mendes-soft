/* eslint-disable no-template-curly-in-string */
import React, { useCallback, useRef } from "react";
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

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

Yup.setLocale({
  number: {
    min: "${path} valor inválido",
  },
});

const ModalCreateCategory: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();

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
        await api.post("/category", { category: data });
        toast.addToast({
          title: "Sucesso",
          type: "success",
          description: `Salvou ${JSON.stringify(data)}`,
        });
        setIsOpen();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }

        toast.addToast({
          title: "Falha",
          type: "error",
          description: `Erro ao cadastrar Categoria: ${error.response?.message}`,
        });
      }
    },
    [toast, setIsOpen]
  );

  return (
    <ModalComponent
      title="Cadastro Categoria"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width={500}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Input name="name" label="Nome" />
          <Input name="description" label="Descrição" />
          <button type="submit">
            <FiCheck size={25} />
            Concluir
          </button>
        </Form>
      </Container>
    </ModalComponent>
  );
};

export default ModalCreateCategory;
