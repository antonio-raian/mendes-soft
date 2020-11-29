import React from "react";
import {
  BrowserRouter,
  RouteProps as CustomRouteProps,
  Route as CustomRoute,
  Redirect,
} from "react-router-dom";

import DashBoard from "@/pages/DashBoard";
import Products from "@/pages/Products";
import ProductList from "@/modules/Products/pages/List";
import Sales from "@/pages/Sales";
import Purchases from "@/pages/Purchases";
import Employees from "@/pages/Employees";
import ProductCreate from "@/modules/Products/pages/Create";
import ProductUpdate from "@/modules/Products/pages/Update";
import CategoryList from "@/modules/Categories/pages/List";
import SaleList from "@/modules/Sales/pages/List";
import PurchaseList from "@/modules/Purchases/pages/List";
import PurchaseCreate from "@/modules/Purchases/pages/Create";
import PurchaseUpdate from "@/modules/Purchases/pages/Update";
import EmployeeList from "@/modules/Employees/pages/List";
import EmployeeCreate from "@/modules/Employees/pages/Create";
import EmployeeUpdate from "@/modules/Employees/pages/Update";
import SaleCreate from "@/modules/Sales/pages/Create";
import SaleUpdate from "@/modules/Sales/pages/Update";
import NonPage from "@/pages/NonPage";
import { useAuth } from "@/hooks/auth";
import Login from "@/pages/Login";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route isPrivate exact path="/dashboard" component={DashBoard} />
      <Route isPrivate exact path="/produtos" component={Products} />
      <Route isPrivate exact path="/produtos/lista" component={ProductList} />
      <Route
        isPrivate
        exact
        path="/produtos/cadastro"
        component={ProductCreate}
      />
      <Route
        isPrivate
        exact
        path="/produtos/atualiza"
        component={ProductUpdate}
      />
      <Route isPrivate exact path="/produtos/relatorios" component={NonPage} />
      <Route
        isPrivate
        exact
        path="/categorias/lista"
        component={CategoryList}
      />
      <Route
        isPrivate
        exact
        path="/categorias/relatorios"
        component={NonPage}
      />
      <Route isPrivate exact path="/vendas" component={Sales} />
      <Route isPrivate exact path="/vendas/lista" component={SaleList} />
      <Route isPrivate exact path="/vendas/cadastro" component={SaleCreate} />
      <Route isPrivate exact path="/vendas/atualiza" component={SaleUpdate} />
      <Route isPrivate exact path="/vendas/relatorios" component={NonPage} />
      <Route isPrivate exact path="/compras" component={Purchases} />
      <Route isPrivate exact path="/compras/lista" component={PurchaseList} />
      <Route
        isPrivate
        exact
        path="/compras/cadastro"
        component={PurchaseCreate}
      />
      <Route
        isPrivate
        exact
        path="/compras/atualiza"
        component={PurchaseUpdate}
      />
      <Route isPrivate exact path="/compras/relatorios" component={NonPage} />
      <Route isPrivate exact path="/funcionarios" component={Employees} />
      <Route
        isPrivate
        exact
        path="/funcionarios/lista"
        component={EmployeeList}
      />
      <Route
        isPrivate
        exact
        path="/funcionarios/cadastro"
        component={EmployeeCreate}
      />
      <Route
        isPrivate
        exact
        path="/funcionarios/atualiza"
        component={EmployeeUpdate}
      />
      <Route
        isPrivate
        exact
        path="/funcionarios/relatorios"
        component={NonPage}
      />
    </BrowserRouter>
  );
};

interface RouteProps extends CustomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <CustomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Routes;
