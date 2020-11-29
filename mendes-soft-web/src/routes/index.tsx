import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

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

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/dashboard" component={DashBoard} />
      <Route exact path="/produtos" component={Products} />
      <Route exact path="/produtos/lista" component={ProductList} />
      <Route exact path="/produtos/cadastro" component={ProductCreate} />
      <Route exact path="/produtos/atualiza" component={ProductUpdate} />
      <Route exact path="/produtos/relatorios" component={NonPage} />
      <Route exact path="/categorias/lista" component={CategoryList} />
      <Route exact path="/categorias/relatorios" component={NonPage} />
      <Route exact path="/vendas" component={Sales} />
      <Route exact path="/vendas/lista" component={SaleList} />
      <Route exact path="/vendas/cadastro" component={SaleCreate} />
      <Route exact path="/vendas/atualiza" component={SaleUpdate} />
      <Route exact path="/vendas/relatorios" component={NonPage} />
      <Route exact path="/compras" component={Purchases} />
      <Route exact path="/compras/lista" component={PurchaseList} />
      <Route exact path="/compras/cadastro" component={PurchaseCreate} />
      <Route exact path="/compras/atualiza" component={PurchaseUpdate} />
      <Route exact path="/compras/relatorios" component={NonPage} />
      <Route exact path="/funcionarios" component={Employees} />
      <Route exact path="/funcionarios/lista" component={EmployeeList} />
      <Route exact path="/funcionarios/cadastro" component={EmployeeCreate} />
      <Route exact path="/funcionarios/atualiza" component={EmployeeUpdate} />
      <Route exact path="/funcionarios/relatorios" component={NonPage} />
    </BrowserRouter>
  );
};

export default Routes;
