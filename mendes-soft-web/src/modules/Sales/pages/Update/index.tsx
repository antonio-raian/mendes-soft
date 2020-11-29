import React, { useCallback, useRef } from "react";
import { Form } from "@unform/web";

import * as Yup from "yup";

import Input from "@/components/Form/Input";

import { Container } from "./styles";
import Select from "@/components/Form/Select";
import { FiCheck } from "react-icons/fi";
import { FormHandles, Scope } from "@unform/core";
import { getValidationErrors } from "@/utils/getValidationErrors";
import { useToast } from "@/hooks/toast";
import SecondLayout from "@/layouts/SecondLayout";

Yup.setLocale({
  number: {
    min: "${path} valor inválido",
  },
});

const SaleUpdate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schope = Yup.object().shape({
          category: Yup.number().required("Categoria é obrigatória!").min(1),
          item: Yup.object().shape({
            bar_code: Yup.string().required("Código de Barra Obrigatório"),
            name: Yup.string().required("Nome Obrigatório"),
            description: Yup.string(),
            gain: Yup.number(),
          }),
        });

        await schope.validate(data, {
          abortEarly: false,
        });
        toast.addToast({
          title: "Sucesso",
          type: "success",
          description: `Salvou ${data}`,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          toast.addToast({
            title: "Falha",
            type: "error",
            description: `${Object.values(errors)}`,
          });
          return;
        }
      }
    },
    [toast]
  );

  return (
    <SecondLayout topTitle="Atualização Venda">
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Scope path="item">
            <Input name="bar_code" label="Código de Barra" />
            <Input name="name" label="Nome" />
            <Input name="description" label="Descrição" />
            <Input
              name="gain"
              label="Lucro (%)"
              type="number"
              min={0}
              value={0}
            />
          </Scope>
          <Select
            defaultValue={{ label: "Selecione uma Categoria", value: 0 }}
            name="category"
            label="Categoria"
            options={[{ label: "Teste1", value: 1 }]}
          />
          <button type="submit">
            <FiCheck size={25} />
            Concluir
          </button>
        </Form>
      </Container>
    </SecondLayout>
  );
};

export default SaleUpdate;
