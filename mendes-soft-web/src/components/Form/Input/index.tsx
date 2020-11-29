import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useField } from "@unform/core";

import { Container, Field, Header } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  containerStyle?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  containerStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container style={containerStyle}>
      <Header>
        <label>{label}</label>
        {error && <text>{error}</text>}
      </Header>
      <Field isFocused={isFocused} isErrored={!!error}>
        <input
          name={name}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          {...rest}
        />
      </Field>
    </Container>
  );
};

export default Input;
