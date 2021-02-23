export interface Person {
  id: string;
  name: string;
  document: string;
  active: boolean;
  addresses: [Address];
  contacts: [Contact];
}

export interface Client {
  id: string;
  limit: number;
  active: boolean;
  person: Person;
}

export interface User {
  id: string;
  username: string;
  remember_me_token: string;
  active: boolean;
  employee: Employee;
}

export interface Address {
  id: string;
  cep: string;
  public_name: string;
  number: string;
  aditional: string;
  district: string;
  city: string;
  state: string;
  active: boolean;
}

export interface Contact {
  id: string;
  email: string;
  celphone: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
  items: [Item];
}

export interface MeasureUnit {
  id: string;
  description: string;
  initials: string;
  active: boolean;
}

export interface Item {
  id: string;
  internal_code: string;
  bar_code: string;
  name: string;
  description: string;
  gain: number;
  active: boolean;
  category: Category;
  measure: MeasureUnit;
  storage: Storage;
}

export interface Storage {
  id: string;
  quantity: number;
  value_sale: number;
  value_cost: number;
  active: boolean;
  item: Item;
}

export interface Purchase {
  id: string;
  items: [];
  value: number;
  type_payment: string;
  expected_payment_date: string;
  status: string;
  active: boolean;
  created_at: string;
  employee: Employee;
}

export interface Sale {
  id: string;
  items: [];
  gross_value: number;
  net_value: number;
  discount: number;
  type_payment: string;
  form_payment: string;
  payment_date: string;
  expected_payment_date: [];
  status: string;
  active: boolean;
  created_at: string;
  employee: Employee;
}

export interface Employee {
  id: string;
  comission: number;
  salary: number;
  active: boolean;
  person: Person;
  user: User;
}

// Utils
export interface MetaListpaginated {
  current_page: number;
  first_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: number;
  per_page: number;
  previous_page_url: number;
  total: number;
}
