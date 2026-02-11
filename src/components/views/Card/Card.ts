import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface ICard {
  title: string;
  price: number | null;
}

export class Card extends Component<ICard>{
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container)

    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container)
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container)
  }

  set title(value: string) {
    this.titleElement.textContent = value
  }

  set price(value: number) {
    if (value === null) {
      this.priceElement.textContent = 'Недоступно';
    } else {
      this.priceElement.textContent = String(value) + 'синапсов'
    }
    
  }

}