import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import DashBoard from "@/pages/DashBoard";
import Products from "@/pages/Products";
import ProductList from "@/modules/Products/pages/List";
import CategoryList from "@/modules/Categories/pages/List";
import Sales from "@/pages/Sales";
import SalesList from "@/modules/Sales/pages/List";
import Purchases from "@/pages/Purchases";
import PruchaseList from "@/modules/Purchases/pages/List";
import Employees from "@/pages/Employees";
import EmployeeList from "@/modules/Employees/pages/List";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/dashboard" component={DashBoard} />
      <Route exact path="/produtos" component={Products} />
      <Route exact path="/produtos/lista" component={ProductList} />
      <Route exact path="/categorias/lista" component={CategoryList} />
      <Route exact path="/vendas" component={Sales} />
      <Route exact path="/vendas/lista" component={SalesList} />
      <Route exact path="/compras" component={Purchases} />
      <Route exact path="/compras/lista" component={PruchaseList} />
      <Route exact path="/funcionarios" component={Employees} />
      <Route exact path="/funcionarios/lista" component={EmployeeList} />
    </BrowserRouter>
  );
};

export default Routes;
