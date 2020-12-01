import React from "react";
import { Container } from "./styles";
import { FaBoxes } from "react-icons/fa";

interface EmptyProps {
  search?: string;
  model?: string;
}

const EmptyPage: React.FC<EmptyProps> = ({ search, model }) => {
  return (
    <Container>
      <FaBoxes size={100} color="#07f7" />
      <h2>
        Nenhum item encontrado{search && ` para busca: ${search} em ${model}`}
      </h2>
    </Container>
  );
};

export default EmptyPage;
