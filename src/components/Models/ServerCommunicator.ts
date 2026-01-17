import { IApi, ProductsInfo, OrderInfo, ServerAnswer } from "../../types/index"

export class ServerCommunicator{
  api: IApi;

  constructor(api: IApi) {
    this.api = api
  }

  getProducts(): Promise<ProductsInfo> {
    return this.api.get<ProductsInfo>('/product/')
  }

  sendOrderInfo(info: OrderInfo): Promise<ServerAnswer> {
    return this.api.post<ServerAnswer>('/order/', info)
  }
}