import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { IconBaseProps } from "react-icons";
import { useField } from "@unform/core";

import { Container, Field, Header } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  containerStyle,
  icon: Icon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container style={containerStyle}>
      <Header>
        <label>{label}</label>
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

        {Icon && (
          <Icon
            size={20}
            color={isFilled || isFocused ? "#3366ff" : "#BDBDBD"}
          />
        )}
      </Field>
    </Container>
  );
};

export default Input;
