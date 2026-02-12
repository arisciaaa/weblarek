import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export interface IForm {
  errors: string;
}

export class Form<T extends IForm> extends Component<T>{
  protected errorsElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container)

    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container)
    this.buttonElement = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container)
  }

  set errors(value: string) {
    this.errorsElement.textContent = value
  }

  set buttonIsDisabled(value: boolean) {
    this.buttonElement.disabled = value
  }

}