/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return "Bem vindo ao Mendes Soft";
});

Route.post("/login", "UserController.login");

// User
Route.group(() => {
  Route.post("", "UserController.create");
  Route.get("", "UserController.show");
  Route.put("", "UserController.update");
  Route.delete(":id", "UserController.destroy");
})
  .prefix("/user")
  .middleware(["auth"]);

// People
Route.group(() => {
  Route.post("", "Corporate/PeopleController.create");
  Route.get("", "Corporate/PeopleController.show");
  Route.put("", "Corporate/PeopleController.update");
  Route.delete(":id", "Corporate/PeopleController.destroy");
})
  .prefix("/person")
  .middleware(["auth"]);

// Addresses
Route.group(() => {
  Route.post("", "Corporate/AddressesController.create");
  Route.get("", "Corporate/AddressesController.show");
  Route.put("", "Corporate/AddressesController.update");
  Route.delete(":id", "Corporate/AddressesController.destroy");
})
  .prefix("/address")
  .middleware(["auth"]);

// Contacts
Route.group(() => {
  Route.post("", "Corporate/ContactsController.create");
  Route.get("", "Corporate/ContactsController.show");
  Route.put("", "Corporate/ContactsController.update");
  Route.delete(":id", "Corporate/ContactsController.destroy");
})
  .prefix("/contact")
  .middleware(["auth"]);

// Employes
Route.group(() => {
  Route.post("", "Corporate/EmployesController.create");
  Route.get("", "Corporate/EmployesController.show");
  Route.put("", "Corporate/EmployesController.update");
  Route.delete(":id", "Corporate/EmployesController.destroy");
})
  .prefix("/employee")
  .middleware(["auth"]);

// Clients
Route.group(() => {
  Route.post("", "Corporate/ClientsController.create");
  Route.get("", "Corporate/ClientsController.show");
  Route.put("", "Corporate/ClientsController.update");
  Route.delete(":id", "Corporate/ClientsController.destroy");
})
  .prefix("/client")
  .middleware(["auth"]);

// Categories
Route.group(() => {
  Route.post("", "Product/CategoriesController.create");
  Route.get("", "Product/CategoriesController.show");
  Route.put("", "Product/CategoriesController.update");
  Route.delete(":id", "Product/CategoriesController.destroy");
})
  .prefix("/category")
  .middleware(["auth"]);

// Items
Route.group(() => {
  Route.post("", "Product/ItemsController.create");
  Route.get("", "Product/ItemsController.show");
  Route.put("", "Product/ItemsController.update");
  Route.delete(":id", "Product/ItemsController.destroy");
})
  .prefix("/item")
  .middleware(["auth"]);

// Storages
Route.group(() => {
  Route.post("", "Stock/StoragesController.create");
  Route.get("", "Stock/StoragesController.show");
  Route.put("", "Stock/StoragesController.update");
})
  .prefix("/storage")
  .middleware(["auth"]);

// Purchases
Route.group(() => {
  Route.post("", "Financial/PurchasesController.create");
  Route.get("", "Financial/PurchasesController.show");
  Route.put("", "Financial/PurchasesController.update");
  Route.delete(":id", "Financial/PurchasesController.destroy");
})
  .prefix("/purchase")
  .middleware(["auth"]);

// Sales
Route.group(() => {
  Route.post("", "Financial/SalesController.create");
  Route.get("", "Financial/SalesController.show");
  Route.put("", "Financial/SalesController.update");
  Route.delete(":id", "Financial/SalesController.destroy");
})
  .prefix("/sale")
  .middleware(["auth"]);
