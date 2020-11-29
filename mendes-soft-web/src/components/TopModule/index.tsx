import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Back, Container, Logo, Title } from "./styles";

import icon from "@/assets/images/icon.png";

interface TopProps {
  title?: string;
}

const TopModule = ({ title }: TopProps) => {
  const history = useHistory();
  return (
    <Container>
      <Back>
        <FiArrowLeft
          size={30}
          onClick={() => {
            history.goBack();
          }}
        />
      </Back>
      <Logo>
        <img src={icon} alt="logo" />
      </Logo>
      <Title>
        <span>{title}</span>
      </Title>
      <Back></Back>
    </Container>
  );
};

export default TopModule;
