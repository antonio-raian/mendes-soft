import Header from "@/components/Header";
import React from "react";
import {
  BiAbacus,
  BiCabinet,
  BiCart,
  BiGroup,
  BiPurchaseTagAlt,
} from "react-icons/bi";
import { Children, Container, Content, MenuItem, MenuSidebar } from "./styles";

interface LayoutProps {
  headerButtonAction?: () => void;
}

const DashboardLayout: React.FC<LayoutProps> = ({
  children,
  headerButtonAction,
}) => {
  return (
    <Container>
      <Header actionButton={headerButtonAction} />

      <Content>
        <MenuSidebar>
          <MenuItem to="/dashboard" activeClassName="selected">
            <BiAbacus size={20} />
            Dashboard
          </MenuItem>
          <MenuItem to="/produtos" activeClassName="selected">
            <BiCabinet size={20} />
            Produto
          </MenuItem>
          <MenuItem to="/vendas" activeClassName="selected">
            <BiCart size={20} />
            Venda
          </MenuItem>
          <MenuItem to="/compras" activeClassName="selected">
            <BiPurchaseTagAlt size={20} />
            Compra
          </MenuItem>
          <MenuItem to="/funcionarios" activeClassName="selected">
            <BiGroup size={20} />
            Funcionário
          </MenuItem>
        </MenuSidebar>
        <Children>{children}</Children>
      </Content>
    </Container>
  );
};

export default DashboardLayout;
