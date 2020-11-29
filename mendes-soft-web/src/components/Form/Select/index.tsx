import React, { useRef, useEffect } from "react";
import { Props as ReactSelectProps, OptionTypeBase } from "react-select";

import { useField } from "@unform/core";
import { Container, SelectComponent, Header } from "./styles";

export interface SelectObject {
  label: string;
  value: string;
}

interface SelectProps extends ReactSelectProps<OptionTypeBase> {
  name: string;
  label?: string;
}

const Select: React.FC<SelectProps> = ({ label, name, ...rest }) => {
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }

          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }

        if (!ref.state.value) {
          return "";
        }

        return ref.state.value.value;
      },
    });
  }, [rest.isMulti, registerField, fieldName]);

  return (
    <Container>
      <Header>
        <label>{label}</label>
      </Header>
      <SelectComponent
        defaultValue={defaultValue}
        ref={selectRef}
        name={name}
        placeholder="Selecione uma opção"
        loadingMessage={() => "Carregando..."}
        {...rest}
      />
    </Container>
  );
};

export default Select;
