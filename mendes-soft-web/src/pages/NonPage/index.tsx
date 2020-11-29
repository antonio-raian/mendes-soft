import SecondLayout from "@/layouts/SecondLayout";
import React from "react";
import { Container } from "./styles";

import notFound from "@/assets/images/NonPage.png";

const NonPage = () => {
  return (
    <SecondLayout topTitle="Em Desenvolvimento">
      <Container>
        <img src={notFound} />
      </Container>
    </SecondLayout>
  );
};

export default NonPage;
