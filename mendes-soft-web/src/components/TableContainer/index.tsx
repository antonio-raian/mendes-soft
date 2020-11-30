import React from "react";
import { Container } from "./styles";

interface TableProps {
  containerStyle?: React.CSSProperties;
}

const TableContainer: React.FC<TableProps> = ({ children, containerStyle }) => {
  return <Container style={containerStyle}>{children}</Container>;
};

export default TableContainer;
