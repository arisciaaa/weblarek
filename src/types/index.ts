export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export type TPayment = 'cash' | 'card' | ''

export interface IBuyer {
  paymentType: TPayment;
  email: string;
  phoneNumber: string;
  address: string;
}

export type ProductsInfo = IProduct[]

export type OrderInfo = {
  cart: IProduct[];
  buyer: IBuyer
}
