import { ensureElement } from "../../../utils/utils";
import { Card, ICard } from "./Card"
import { IEvents } from "../../base/Events";
import { categoryMap } from '../../../utils/constants';

interface ICardPreview extends ICard{
  category: keyof typeof categoryMap;
  image: string;
  description: string;
}

export class CardPreview extends Card<ICardPreview> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container)

    this.buttonElement.addEventListener('click', () => {
      this.events.emit('card:button-clicked')
    });
  }

  set category(value: keyof typeof categoryMap) {
    this.categoryElement.textContent = value;
    this.categoryElement.className = `card__category ${categoryMap[value]}`
  }

  set image(src: string) {
    this.setImage(this.imageElement, src);
  }

  set description(text: string) {
    this.descriptionElement.textContent = text;
  }

  set buttonIsDisabled(value: boolean) {
    this.buttonElement.disabled = value;
  }

}