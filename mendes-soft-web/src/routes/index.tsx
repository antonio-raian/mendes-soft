import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import DashBoard from "@/pages/DashBoard";
import Products from "@/pages/Products";
import Sales from "@/pages/Sales";
import Purchases from "@/pages/Purchases";
import Employees from "@/pages/Employees";
import ProductList from "@/modules/Products/pages/List";
import CategoryList from "@/modules/Categories/pages/List";
import SalesList from "@/modules/Sales/pages/List";
import PruchaseList from "@/modules/Purchases/pages/List";
import EmployeeList from "@/modules/Employees/pages/List";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/dashboard" component={DashBoard} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/list" component={ProductList} />
      <Route exact path="/categories/list" component={CategoryList} />
      <Route exact path="/sales" component={Sales} />
      <Route exact path="/sales/list" component={SalesList} />
      <Route exact path="/purchases" component={Purchases} />
      <Route exact path="/purchases/list" component={PruchaseList} />
      <Route exact path="/employees" component={Employees} />
      <Route exact path="/employees/list" component={EmployeeList} />
    </BrowserRouter>
  );
};

export default Routes;
