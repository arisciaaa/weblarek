import { IApi, IProduct, IBuyer } from "../../../types/index"

export class ServerCommunicator{
  api: IApi;

  constructor(api: IApi) {
    this.api = api
  }

  getProducts(): Promise<IProduct[]> {
    return this.api.get('/product/')
  }

  sendOrderInfo(cart: IProduct[], buyer: IBuyer): Promise<object> {
    return this.api.post('/order/', {cart, buyer})
  }
}