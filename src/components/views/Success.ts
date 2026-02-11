import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";


interface ISuccess {
  totalSum: number;
}

export class Success extends Component<ISuccess> {
  protected totalElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.totalElement = ensureElement<HTMLElement>('.order-success__description', this.container)
    this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container)

    this.buttonElement.addEventListener('click', () => {
      this.events.emit('success:close')
    });
  }

  set totalSum(value: number) {
    this.totalElement.textContent = 'Списано ' + String(value) + ' синапсов'
  }
}