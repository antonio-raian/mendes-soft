import styled, { css } from 'styled-components';

interface FieldProps {
  isFocused: boolean;
  isErrored: boolean;
}

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

export const Field = styled.div<FieldProps>`
  width: 100%;
  background: #fff;
  padding: 12px 16px;

  border: 1px solid #dfe1e8;
  border-radius: 5px;

  transition: border-color 0.2s;
  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #3366ff;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #db2c23;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #212121;
  }

  svg {
    margin-left: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 16px;
    color: #bdbdbd;
  }
`;
