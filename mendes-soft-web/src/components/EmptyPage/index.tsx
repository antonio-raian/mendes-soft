import React from "react";
import { Container } from "./styles";
import { FaBoxes } from "react-icons/fa";

const EmptyPage = () => {
  return (
    <Container>
      <FaBoxes size={100} color="#07f7" />
      <h2>Nenhum item encontrado</h2>
    </Container>
  );
};

export default EmptyPage;
