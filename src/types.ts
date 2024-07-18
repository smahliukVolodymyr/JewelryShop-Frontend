export interface User {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface ResponseMessage {
  message: string;
}

export interface Material {
  _id?: string;
  name: string;
  pricePerGram: number;
}

export interface dropDownSelector {
  type: string;
  value: string;
}

export interface MaterialInProduct {
  _id: string;
  name: string;
}
export interface Product {
  _id?: string;
  name: string;
  type:
    | 'Earrings'
    | 'Bracelets'
    | 'Rings'
    | 'Chains'
    | 'Necklaces'
    | 'Brooches'
    | 'Pendants';
  materials: (string | MaterialInProduct)[];
  weight: number;
  price: number;
}

export interface ProductInSales {
  _id: string;
  name: string;
}
export interface SaleItem {
  _id?: string;
  product: string | ProductInSales;
  saleDate?: string;
  finalPrice: number;
  buyerLastName: string;
  buyerFirstName: string;
  buyerMiddleName: string;
}
