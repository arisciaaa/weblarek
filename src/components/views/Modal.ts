import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected closeButtonElement: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container)
    this.closeButtonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container)

    this.closeButtonElement.addEventListener('click', () => {
      this.events.emit('modal:close')
    });
    
    this.container.addEventListener('click', () => {
      this.events.emit('modal:close')
    });

    this.contentElement.addEventListener('click', (e) => {
      e.stopPropagation()
    });

  }

  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value)
  }

  open() {
    this.container.classList.add('modal_active');
  }

  close() {
    this.container.classList.remove('modal_active');
  }

}