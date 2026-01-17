import { IProduct } from "../../types/index"

export class Cart{
  protected productsToBuy: IProduct[] = []

  getProductsFromCart(): IProduct[] {
    return this.productsToBuy
  }

  addProductToCart(product: IProduct): void {
    this.productsToBuy.push(product)
  }

  deleteProductFromCart(product: IProduct): void {
    const index = this.productsToBuy.indexOf(product)

    if (index !== -1) {
      this.productsToBuy.splice(index, 1)
    } else {
      console.warn(`Такого товара ${product} нет в корзине`)
    }
  }

  clearCart(): void {
    this.productsToBuy = []
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