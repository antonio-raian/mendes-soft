import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  padding: 25px 30px 0;
`;

export const MenuSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 85vh;
  background-color: white;
`;

export const MenuItem = styled(NavLink)`
  display: block;
  height: 50px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;

  font-size: 16px;
  color: #1d1d1d;
  font-style: normal;
  font-weight: 500;

  display: flex;
  align-items: center;

  padding: 0 48px;

  background-color: #fff;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f9ff;
  }

  svg {
    color: #1d1d1d;
    margin-right: 16px;
  }

  &.selected {
    background-color: #f5f9ff;
  }

  &.selected::before {
    content: "";
    width: 5px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #3366ff;
  }
`;

export const Children = styled.div`
  width: 100%;
  height: 85vh;
`;
