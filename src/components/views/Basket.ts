import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Component } from "../base/Component";

interface IBasket{
  productsList: HTMLElement[];
  totalSum: number;
  buttonIsDisabled: boolean;
}

export class Basket extends Component<IBasket> {
  protected productsListElement: HTMLElement;
  protected totalSumElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.productsListElement = ensureElement<HTMLElement>('.basket__list', this.container)
    this.totalSumElement = ensureElement<HTMLElement>('.basket__price', this.container)
    this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container)

    this.buttonElement.addEventListener('click', () => {
      this.events.emit('basket:button-submit')
    });
  }

  set productsList(items: HTMLElement[]) {
    if (items !== null) {
      this.productsListElement.replaceChildren(...items)
    }
  }

  set totalSum(value: number) {
    this.totalSumElement.textContent = String(value) + ' синапсов'
  }

  set buttonIsDisabled(value: boolean) {
    this.buttonElement.disabled = value
  }
}