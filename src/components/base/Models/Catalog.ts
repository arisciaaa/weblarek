import { IProduct } from "../../../types/index"

export class Catalog{
  products: IProduct[] = [];
  selectedProduct: IProduct | null = null

  saveProductsArray(products: IProduct[]): void {
    this.products = products
  }

  getAllProducts(): IProduct[] {
    return this.products
  }

  getProductByID(id: string): IProduct | undefined {
    const product = (obj: IProduct) => obj.id === id

    return this.products.find(product)
  }

  saveProductToShow(selectedProduct: IProduct | null): void {
    this.selectedProduct = selectedProduct
  }

  getProductToShow(): IProduct | null {
    return this.selectedProduct
  }  
}