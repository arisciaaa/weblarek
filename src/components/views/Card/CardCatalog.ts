import { ensureElement } from "../../../utils/utils";
import { Card, ICard } from "./Card"
import { categoryMap } from '../../../utils/constants';
import { IEvents } from "../../base/Events";

interface ICardCatalog extends ICard{
  category: keyof typeof categoryMap;
  image: string;
}

export class CardCatalog extends Card<ICardCatalog> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)

    this.container.addEventListener('click', () => {
      this.events.emit('card:open')
    });
  }

  set category(value: keyof typeof categoryMap) {
    this.categoryElement.textContent = value
    this.categoryElement.className = `card__category ${categoryMap[value]}`
  }

  set image(src: string) {
    this.setImage(this.imageElement, src)
  }
}