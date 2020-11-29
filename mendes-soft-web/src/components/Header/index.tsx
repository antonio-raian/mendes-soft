import React, { useState } from "react";

import { FiPower } from "react-icons/fi";

import { Button, Container, Hour, Logo } from "./styles";

import logo from "@/assets/images/Logo.png";
import { useAuth } from "@/hooks/auth";

interface HeaderProps {
  actionButton?: () => void;
}

const Header = ({ actionButton }: HeaderProps) => {
  const { signOut } = useAuth();

  const [hour, setHour] = useState<number>(new Date().getHours());
  const [minute, setMinute] = useState<number>(new Date().getMinutes());

  setTimeout(() => {
    setHour(new Date().getHours());
    setMinute(new Date().getMinutes());
  }, 10000);

  return (
    <Container>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <Hour>
        <h3>
          {hour}:{minute < 10 ? "0" + minute : minute}
        </h3>
      </Hour>
      <Button>
        <button onClick={actionButton}>
          <FiPower size={25} onClick={signOut} />
        </button>
      </Button>
    </Container>
  );
};

export default Header;
