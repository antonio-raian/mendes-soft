import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/MenuOptions/styles";

interface MenuOptionsProps {
  buttons: { id: number; label: string; path: string }[];
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ buttons }) => {
  return (
    <Container>
      {buttons.map((btn) => (
        <Link to={btn.path}>
          <span>{btn.label}</span>
        </Link>
      ))}
    </Container>
  );
};

export default MenuOptions;
