import { ensureElement } from "../../../utils/utils";
import { Form, IForm } from "./Form"
import { IEvents } from "../../base/Events";
import { TPayment } from  "../../../types/index"

interface IOrderForm extends IForm{
  address: string;
  payment: TPayment;
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

    this.addressElement.addEventListener('input', () => {
      this.events.emit('address:changed', {address: this.addressElement.value})
    });
  }

  set address(value: string) {
    this.addressElement.value = value;
  }

  set payment(value: TPayment) {
    this.buttonOnlineElement.classList.toggle(
      'button_alt-active',
      value === 'card'
    );

    this.buttonWhenReceivedElement.classList.toggle(
      'button_alt-active',
      value === 'cash'
    );
  }


}