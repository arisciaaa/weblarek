import { IProduct } from "../../types/index"
import { EventEmitter } from "../base/Events";

export class Cart{
  protected productsToBuy: IProduct[] = []

  constructor(private events: EventEmitter) {
  }

  getProductsFromCart(): IProduct[] {
    return this.productsToBuy
  }

  addProductToCart(product: IProduct): void {
    this.productsToBuy.push(product)
    this.events.emit('cart:add-product')
  }

  deleteProductFromCart(product: IProduct): void {
    const index = this.productsToBuy.indexOf(product)

    if (index !== -1) {
      this.productsToBuy.splice(index, 1)
      this.events.emit('cart:delete-product')
    } else {
      console.warn(`Такого товара ${product} нет в корзине`)
    }
  }

  clearCart(): void {
    this.productsToBuy = []
    this.events.emit('cart:clear')
  }

  getTotalPrice(): number {
    return this.productsToBuy.reduce((accumulator, currentProduct) => 
      accumulator + (currentProduct.price || 0), 0)
  }

  getAmountOfProducts(): number {
    return this.productsToBuy.length
  }

  checkPresenceOfProduct(id: string): boolean {
    return this.productsToBuy.some((product: IProduct) => product.id === id)
  }
}