import "./content-fields-view.css";
import ElementCreator from "../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../util/element-creator/element-creator-types";
import { NumbersLineView } from "./numbers-line-view/numbers-line-view";

const CSS_CLASSES = {
  topLine: ["view__top-line"],
  topLineTitle: ["view__title"],
  topLineDescription: ["view__description"],
  contentWrap: ["view__content-wrapper"],
  content: ["view__content"],
};

export class ContentFieldsView {
  private element: IElementCreator;

  private contentFieldCreator: IElementCreator | null;

  constructor(param: IElementCreatorParam) {
    this.element = new ElementCreator(param);
    this.contentFieldCreator = null;
  }

  public getContentFieldWrapElement(): HTMLElement {
    return this.element.getElement();
  }

  public getContentField(): IElementCreator | null {
    return this.contentFieldCreator;
  }

  protected createTopLine(
    topLineTitleTextContent: string,
    topLineDescriptionTextContent: string
  ): void {
    const topLineParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.topLine,
      textContent: "",
      callback: null,
    };

    const topLineTitleParams: IElementCreatorParam = {
      tag: "h2",
      cssClasses: CSS_CLASSES.topLineTitle,
      textContent: topLineTitleTextContent,
      callback: null,
    };

    const topLineDescriptionParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.topLineDescription,
      textContent: topLineDescriptionTextContent,
      callback: null,
    };
    const topLine = new ElementCreator(topLineParams);
    const topLineTitle = new ElementCreator(topLineTitleParams);
    const topLineDescription = new ElementCreator(topLineDescriptionParams);

    topLine.addInnerElement(topLineTitle);
    topLine.addInnerElement(topLineDescription);

    this.element.addInnerElement(topLine);
  }

  protected createContentField(): void {
    const contentWrapParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.contentWrap,
      textContent: "",
      callback: null,
    };

    const contentParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.content,
      textContent: "",
      callback: null,
    };
    const contentWrap = new ElementCreator(contentWrapParams);
    const content = new ElementCreator(contentParams);
    this.contentFieldCreator = content;

    const numbersLine = new NumbersLineView();
    const numberLineElement = numbersLine.getElement();
    contentWrap.addInnerElement(numberLineElement);

    contentWrap.addInnerElement(content);
    this.element.addInnerElement(contentWrap);
  }
}
