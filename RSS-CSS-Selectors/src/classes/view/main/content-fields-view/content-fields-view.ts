import "./content-fields-view.css";
import ElementCreator from "../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../util/element-creator/element-creator-types";
import { NumbersLineView } from "./numbers-line-view/numbers-line-view";

const CSS_CLASSES_CSS_TOP_LINE = ["view__top-line"];
const CSS_CLASSES_CSS_TOP_LINE_TITLE = ["view__title"];
const CSS_CLASSES_CSS_TOP_LINE_DESCRIPTION = ["view__description"];
const CSS_CLASSES_CSS_CONTENT_WRAP = ["view__content-wrapper"];
const CSS_CLASSES_CSS_CONTENT = ["view__content"];

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
      cssClasses: CSS_CLASSES_CSS_TOP_LINE,
      textContent: "",
      callback: null,
    };

    const topLineTitleParams: IElementCreatorParam = {
      tag: "h2",
      cssClasses: CSS_CLASSES_CSS_TOP_LINE_TITLE,
      textContent: topLineTitleTextContent,
      callback: null,
    };

    const topLineDescriptionParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_CSS_TOP_LINE_DESCRIPTION,
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
      cssClasses: CSS_CLASSES_CSS_CONTENT_WRAP,
      textContent: "",
      callback: null,
    };

    const contentParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_CSS_CONTENT,
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
