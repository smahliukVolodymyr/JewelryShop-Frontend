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
