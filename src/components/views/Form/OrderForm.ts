import { ensureElement } from "../../../utils/utils";
import { Form, IForm } from "./Form"
import { IEvents } from "../../base/Events";

interface IOrderForm extends IForm{
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  protected addressElement: HTMLInputElement;
  protected buttonOnlineElement: HTMLButtonElement;
  protected buttonWhenReceivedElement: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.addressElement = ensureElement<HTMLInputElement>('input[name="address"]', this.container)
    this.buttonOnlineElement = ensureElement<HTMLButtonElement>('button[name="card"]', this.container)
    this.buttonWhenReceivedElement = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container)

    this.buttonOnlineElement.addEventListener('click', () => {
      this.events.emit('order:payment-select', {type: 'card'})
    });

    this.buttonWhenReceivedElement.addEventListener('click', () => {
      this.events.emit('order:payment-select', {type: 'cash'})
    });
  }

  set address(value: string) {
    this.addressElement.value = value;
  }

}