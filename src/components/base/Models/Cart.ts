import { IProduct } from "../../../types/index"

export class Cart{
  productsToBuy: IProduct[] = []

  getProductsFromCart(): IProduct[] {
    return this.productsToBuy
  }

  addProductToCart(product: IProduct): void {
    this.productsToBuy.push(product)
  }

  deleteProductFromCart(product: IProduct): void {
    const index = this.productsToBuy.indexOf(product)

    this.productsToBuy.splice(index, 1)
  }

  clearCart(): void {
    this.productsToBuy = []
  }

  getTotalPrice(): number {
    return this.productsToBuy.reduce((accumulator, currentProduct) => {
      const price = currentProduct.price || 0;

      return accumulator + price
    }, 0)
  }

  getAmountOfProducts(): number {
    return this.productsToBuy.length
  }

  checkPresenceOfProduct(id: string): boolean {

    const productIsPresent = (obj: IProduct) => obj.id === id
    return this.productsToBuy.some(productIsPresent)
  }

}