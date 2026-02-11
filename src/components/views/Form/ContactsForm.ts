import { ensureElement } from "../../../utils/utils";
import { Form, IForm } from "./Form"
import { IEvents } from "../../base/Events";

interface IContactsForm extends IForm{
  email: string;
  phone: string;
}

export class ContactsForm extends Form<IContactsForm> {
  protected emailElement: HTMLInputElement;
  protected phoneElement: HTMLInputElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.emailElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container)
    this.phoneElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container)
  }

  set email(value: string) {
    this.emailElement.value = value;
  }

  set phone(value: string) {
    this.phoneElement.value = value;
  }

}