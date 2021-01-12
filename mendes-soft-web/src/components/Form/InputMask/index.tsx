import React, { useRef, useState, useCallback, useEffect } from "react";
import { IconBaseProps } from "react-icons";
import Input, {
  Props as InputMaskProps,
  ReactInputMask,
} from "react-input-mask";

import { useField } from "@unform/core";

import { Container, Field, Header } from "./styles";

interface InputProps extends InputMaskProps {
  label: string;
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

type InputMaskType = ReactInputMask & {
  value: string;
};

const InputMask: React.FC<InputProps> = ({
  label,
  name,
  containerStyle,
  icon: Icon,
  onBlur,
  ...rest
}) => {
  const inputMaskRef = useRef<InputMaskType>(null);

  const [isFocused, setIsFocused] = useState(false);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputMaskRef.current,
      getValue: (ref: any) => ref.value,
      clearValue: (ref: any) => {
        ref.setInputValue("");
      },
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      if (onBlur) {
        onBlur(event);
      }
    },
    [onBlur]
  );

  return (
    <Container style={containerStyle}>
      <Header>
        <label>{label}</label>
        {error && <text>{error}</text>}
      </Header>
      <Field isFocused={isFocused} isErrored={!!error}>
        <Input
          name={name}
          maskChar={null}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputMaskRef}
          {...rest}
        />
      </Field>
    </Container>
  );
};

export default InputMask;
