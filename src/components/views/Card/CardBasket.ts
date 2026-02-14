import { ensureElement } from "../../../utils/utils";
import { Card, ICard } from "./Card"
import { IEvents } from "../../base/Events";

interface ICardBasket extends ICard{
  index: number;
  id: string;
}

export class CardBasket extends Card<ICardBasket> {
  protected indexElement: HTMLElement;
  protected deleteButtonElement: HTMLButtonElement;
  private id: string = ''

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
    this.deleteButtonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)

    this.deleteButtonElement.addEventListener('click', () => {
      this.events.emit('basket:card-delete', {id: this.id})      
    });
  }

  set index(value: number) {
    this.indexElement.textContent = String(value)
  }

  set idSet(value: string) {
    this.id = value
  }
}