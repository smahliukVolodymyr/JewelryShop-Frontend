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
