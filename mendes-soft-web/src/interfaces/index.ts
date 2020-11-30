export interface Person {
  id: string;
  name: string;
  document: string;
  active: boolean;
  addresses: [Address];
  contacts: [Contact];
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

export interface Item {
  id: string;
  internal_code: string;
  bar_code: string;
  name: string;
  description: string;
  gain: number;
  active: boolean;
  category: Category;
}

export interface Purchase {
  id: string;
  items: string;
  value: number;
  type_payment: string;
  expected_payment_date: string;
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
}
