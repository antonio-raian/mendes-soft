import TopModule from "@/components/TopModule";
import React from "react";
import { Container, Content } from "./styles";

interface LayoutProps {
  topTitle?: string;
}

const SecondLayout: React.FC<LayoutProps> = ({ topTitle, children }) => {
  return (
    <Container>
      <TopModule title={topTitle} />
      <Content>{children}</Content>
    </Container>
  );
};

export default SecondLayout;
