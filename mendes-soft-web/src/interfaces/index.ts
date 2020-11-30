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
  active: true;
  category: Category;
}
