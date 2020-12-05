import styled from "styled-components";
import ReactSelect, { Styles } from "react-select";

export const Container = styled.tfoot`
  width: 100%;
  border: 2px solid;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

export const Page = styled.div``;

export const SelectComponent = styled(ReactSelect).attrs({
  styles: {
    control: (styles) => ({
      ...styles,
      height: 45,
      backgroundColor: "#fff",
      borderRadius: 5,
      borderColor: "#ddd",
      borderWidth: 1,
      ":hover": {
        borderColor: "#007ff",
      },
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#bdbdbd",
      fontFamily: "Roboto",
    }),
    container: (styles) => ({
      ...styles,
      ":focus": {
        borderColor: "#007ff",
      },
    }),
    indicatorSeparator: () => ({
      opacity: 0,
    }),
    option: (styles) => ({
      ...styles,
      fontFamily: "Roboto",
    }),
  } as Styles,
})``;
