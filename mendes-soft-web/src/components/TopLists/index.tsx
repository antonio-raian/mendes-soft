import React from "react";
import { Container } from "./styles";

interface TopProps {
  containerStyle?: React.CSSProperties;
}

const TopLists: React.FC<TopProps> = ({ containerStyle, children }) => {
  return <Container style={containerStyle}>{children}</Container>;
};

export default TopLists;
