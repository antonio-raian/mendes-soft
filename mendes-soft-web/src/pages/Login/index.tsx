import { Credentials, useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Container, Content, Logo } from "./styles";
import * as Yup from "yup";
import { getValidationErrors } from "@/utils/getValidationErrors";
import { Form } from "@unform/web";
import Input from "@/components/Form/Input";
import logo from "@/assets/images/LogoName.png";
import icon from "@/assets/images/icon.png";

const Login = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { signIn, loading } = useAuth();

  const handleSubmit = useCallback(
    async (data: Credentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required("Nome de usuário obrigatório"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { username, password } = data;

        await signIn({ username, password });

        history.push("/dashboard");
      } catch (error) {
        console.log("erro", error);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: "error",
          title: "Erro",
          description: "Usuário e/ou senha incorretos",
        });
      }
    },
    [history, signIn, addToast]
  );
  return (
    <Container>
      <img src={icon} alt="icon" />
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>
          <Input name="username" label="Usuário" />
          <Input name="password" label="Senha" type="password" />
          <button type="submit" disabled={loading}>
            Entrar
          </button>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
