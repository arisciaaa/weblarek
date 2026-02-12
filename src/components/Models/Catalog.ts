import { IProduct } from "../../types/index"
import { EventEmitter } from "../base/Events";

export class Catalog{
  protected products: IProduct[] = [];
  protected selectedProduct: IProduct | null = null

  constructor(private events: EventEmitter) {
  }

  saveProductsArray(products: IProduct[]): void {
    this.products = products
    this.events.emit('catalog:save-products-catalog')
  }

  getAllProducts(): IProduct[] {
    return this.products
  }

  getProductByID(id: string): IProduct | undefined {
    return this.products.find((product: IProduct) => product.id === id)
  }

  saveProductToShow(selectedProduct: IProduct | null): void {
    this.selectedProduct = selectedProduct
    this.events.emit('catalog:selected-product-changed')
  }

  getProductToShow(): IProduct | null {
    return this.selectedProduct
  }  
}