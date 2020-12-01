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
import PurchaseList from "@/modules/Purchases/pages/List";
import PurchaseCreate from "@/modules/Purchases/pages/Create";
import NonPage from "@/pages/NonPage";
import { useAuth } from "@/hooks/auth";
import Login from "@/pages/Login";
import PurchaseDetails from "@/modules/Purchases/pages/Details";
import Storage from "@/pages/Storage";
import StorageList from "@/modules/Storage/pages/List";

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
      <Route isPrivate exact path="/vendas/lista" component={NonPage} />
      <Route isPrivate exact path="/vendas/cadastro" component={NonPage} />
      <Route isPrivate exact path="/vendas/atualiza" component={NonPage} />
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
        path="/compras/detalhes"
        component={PurchaseDetails}
      />
      <Route isPrivate exact path="/compras/relatorios" component={NonPage} />
      <Route isPrivate exact path="/estoques" component={Storage} />
      <Route isPrivate exact path="/estoques/lista" component={StorageList} />
      <Route
        isPrivate
        exact
        path="/estoques/cadastro"
        component={PurchaseCreate}
      />
      <Route
        isPrivate
        exact
        path="/estoques/detalhes"
        component={PurchaseDetails}
      />
      <Route isPrivate exact path="/estoques/relatorios" component={NonPage} />
      <Route isPrivate exact path="/funcionarios" component={Employees} />
      <Route isPrivate exact path="/funcionarios/lista" component={NonPage} />
      <Route
        isPrivate
        exact
        path="/funcionarios/cadastro"
        component={NonPage}
      />
      <Route
        isPrivate
        exact
        path="/funcionarios/atualiza"
        component={NonPage}
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
