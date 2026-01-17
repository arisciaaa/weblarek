import { IProduct } from "../../types/index"

export class Catalog{
  protected products: IProduct[] = [];
  protected selectedProduct: IProduct | null = null

  saveProductsArray(products: IProduct[]): void {
    this.products = products
  }

  getAllProducts(): IProduct[] {
    return this.products
  }

  getProductByID(id: string): IProduct | undefined {
    return this.products.find((product: IProduct) => product.id === id)
  }

  saveProductToShow(selectedProduct: IProduct | null): void {
    this.selectedProduct = selectedProduct
  }

  getProductToShow(): IProduct | null {
    return this.selectedProduct
  }  
}