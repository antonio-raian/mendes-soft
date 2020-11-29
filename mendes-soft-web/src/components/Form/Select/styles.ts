import styled from "styled-components";
import ReactSelect, { Styles } from "react-select";

export const Container = styled.div`
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #212121;
  }

  & + div {
    margin-top: 16px;
  }
`;

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

export const Header = styled.div`
  display: flex;
  align-items: center;
`;
